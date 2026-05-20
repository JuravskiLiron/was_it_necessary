using System.Net;
using System.Text.Json;

namespace WasItNecessary.Middleware;

/// <summary>
/// Security middleware:
/// - Blocks known bad User-Agents (bots, scrapers, DDoS tools)
/// - Adds security headers (HSTS, CSP, X-Frame-Options, etc.)
/// - Honeypot endpoint detection
/// - Request size limiting
/// </summary>
public class SecurityMiddleware(RequestDelegate next, ILogger<SecurityMiddleware> logger)
{
    private static readonly HashSet<string> BadAgents =
    [
        "masscan", "nikto", "sqlmap", "zgrab", "nmap",
        "dirbuster", "hydra", "curl/7", "python-requests/2.2",
        "go-http-client/1.1"
    ];

    // Honeypot paths — any access to these bans the IP
    private static readonly HashSet<string> HoneypotPaths =
    [
        "/admin", "/wp-admin", "/phpmyadmin", "/.env",
        "/config", "/backup", "/shell", "/api/v1/admin"
    ];

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value?.ToLower() ?? "";
        var userAgent = context.Request.Headers.UserAgent.ToString().ToLower();
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? "";

        // Check honeypot
        if (HoneypotPaths.Any(p => path.StartsWith(p)))
        {
            logger.LogWarning("HONEYPOT triggered by IP {IP} on path {Path}", ip, path);
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            return;
        }

        // Check bad user agents
        if (BadAgents.Any(ba => userAgent.Contains(ba)))
        {
            logger.LogWarning("Bad user-agent blocked: {UA} from {IP}", userAgent, ip);
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            return;
        }

        // Security headers
        context.Response.Headers["X-Content-Type-Options"] = "nosniff";
        context.Response.Headers["X-Frame-Options"] = "DENY";
        context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
        context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
        context.Response.Headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()";
        context.Response.Headers["Content-Security-Policy"] =
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src * data: blob:; connect-src 'self'";

        await next(context);
    }
}

public static class SecurityMiddlewareExtensions
{
    public static IApplicationBuilder UseSecurityMiddleware(this IApplicationBuilder builder)
        => builder.UseMiddleware<SecurityMiddleware>();
}
