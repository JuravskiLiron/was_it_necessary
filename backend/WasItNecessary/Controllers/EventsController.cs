using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using WasItNecessary.Application.DTOs;
using WasItNecessary.Domain.Interfaces;

namespace WasItNecessary.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("fixed")]
public class EventsController(IEventRepository repo, ILogger<EventsController> logger) : ControllerBase
{
    [HttpGet]
    [ResponseCache(Duration = 60)]
    public async Task<IActionResult> GetEvents(
        [FromQuery] string? category, [FromQuery] string? status,
        [FromQuery] string? search, CancellationToken ct)
    {
        try
        {
            var events = await repo.SearchAsync(category, status, search, ct);
            return Ok(new ApiResponse<object>(true, events, Total: events.Count));
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error fetching events");
            return StatusCode(500, new ApiResponse<object>(false, null, "Server error"));
        }
    }

    [HttpGet("{id}")]
    [ResponseCache(Duration = 300)]
    public async Task<IActionResult> GetEvent(string id, CancellationToken ct)
    {
        var evt = await repo.GetByIdAsync(id, ct);
        if (evt is null) return NotFound(new ApiResponse<object>(false, null, "Event not found"));
        return Ok(new ApiResponse<object>(true, evt));
    }

    [HttpGet("stats")]
    [ResponseCache(Duration = 120)]
    public async Task<IActionResult> GetStats(CancellationToken ct)
    {
        var all = await repo.GetAllAsync(ct);
        return Ok(new
        {
            Success = true,
            Data = new
            {
                Total = all.Count,
                ByStatus = all.GroupBy(e => e.VerificationStatus).ToDictionary(g => g.Key, g => g.Count()),
                ByCategory = all.GroupBy(e => e.Category).ToDictionary(g => g.Key, g => g.Count()),
            }
        });
    }
}
