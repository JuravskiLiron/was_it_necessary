using WasItNecessary.Models;

namespace WasItNecessary.Services;

public interface IEventsService
{
    List<StrikeEvent> GetEvents(string? category, string? status, string? search, int page, int pageSize);
    StrikeEvent? GetEventById(string id);
    int GetTotalCount(string? category, string? status, string? search);
    object GetStats();
}

public class EventsService : IEventsService
{
    // In production, inject IRepository<StrikeEvent> and load from PostgreSQL
    // For demo, data is in-memory seeded from JSON
    private readonly List<StrikeEvent> _events;

    public EventsService(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Data", "events.json");
        if (File.Exists(path))
        {
            var json = File.ReadAllText(path);
            _events = System.Text.Json.JsonSerializer.Deserialize<List<StrikeEvent>>(json,
                new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];
        }
        else
        {
            _events = [];
        }
    }

    public List<StrikeEvent> GetEvents(string? category, string? status, string? search, int page, int pageSize)
    {
        var query = _events.AsQueryable();

        if (!string.IsNullOrEmpty(category) &&
            Enum.TryParse<EventCategory>(category, true, out var cat))
            query = query.Where(e => e.Category == cat);

        if (!string.IsNullOrEmpty(status) &&
            Enum.TryParse<VerificationStatus>(status, true, out var st))
            query = query.Where(e => e.VerificationStatus == st);

        if (!string.IsNullOrEmpty(search))
        {
            var s = search.ToLowerInvariant();
            query = query.Where(e =>
                e.Title.ToLower().Contains(s) ||
                e.Summary.ToLower().Contains(s) ||
                e.Tags.Any(t => t.ToLower().Contains(s)));
        }

        return query
            .OrderByDescending(e => e.Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
    }

    public StrikeEvent? GetEventById(string id) =>
        _events.FirstOrDefault(e => e.Id == id);

    public int GetTotalCount(string? category, string? status, string? search)
    {
        var query = _events.AsQueryable();
        if (!string.IsNullOrEmpty(category) && Enum.TryParse<EventCategory>(category, true, out var cat))
            query = query.Where(e => e.Category == cat);
        if (!string.IsNullOrEmpty(status) && Enum.TryParse<VerificationStatus>(status, true, out var st))
            query = query.Where(e => e.VerificationStatus == st);
        if (!string.IsNullOrEmpty(search))
        {
            var s = search.ToLowerInvariant();
            query = query.Where(e => e.Title.ToLower().Contains(s) || e.Tags.Any(t => t.ToLower().Contains(s)));
        }
        return query.Count();
    }

    public object GetStats() => new
    {
        Total = _events.Count,
        ByCategory = _events
            .GroupBy(e => e.Category.ToString())
            .ToDictionary(g => g.Key, g => g.Count()),
        ByStatus = _events
            .GroupBy(e => e.VerificationStatus.ToString())
            .ToDictionary(g => g.Key, g => g.Count()),
        LastUpdated = _events.MaxBy(e => e.LastUpdated)?.LastUpdated
    };
}
