using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using WasItNecessary.Domain.Interfaces;
using WasItNecessary.Infrastructure.Repositories;
using WasItNecessary.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(o =>
    o.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new() { Title = "WasItNecessary API v1", Version = "v1" }));
builder.Services.AddResponseCaching();
builder.Services.AddMemoryCache();

// ── Clean Architecture DI ──
builder.Services.AddSingleton<IEventRepository, InMemoryEventRepository>();

// ── CORS ──
builder.Services.AddCors(o => o.AddPolicy("Frontend", p =>
    p.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
        ?? ["http://localhost:5173", "https://wasit-necessary.vercel.app"])
     .AllowAnyMethod().AllowAnyHeader()));

// ── Rate Limiting: 100/min per IP ──
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = 429;
    o.OnRejected = async (ctx, _) =>
    {
        ctx.HttpContext.Response.Headers["Retry-After"] = "60";
        await ctx.HttpContext.Response.WriteAsync("{\"success\":false,\"error\":\"Rate limit exceeded. Try again in 60s.\"}");
    };
    o.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.PermitLimit = 100;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueLimit = 5;
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseHttpsRedirection();
app.UseSecurityMiddleware();
app.UseCors("Frontend");
app.UseRateLimiter();
app.UseResponseCaching();
app.MapControllers();
app.MapGet("/health", () => new { status = "ok", timestamp = DateTime.UtcNow });
app.Run();
