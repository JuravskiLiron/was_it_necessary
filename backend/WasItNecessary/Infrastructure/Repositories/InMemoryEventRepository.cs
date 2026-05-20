using System.Text.Json;
using WasItNecessary.Domain.Entities;
using WasItNecessary.Domain.Interfaces;
namespace WasItNecessary.Infrastructure.Repositories;

public class InMemoryEventRepository : IEventRepository
{
    private readonly List<StrikeEvent> _events;
    private static readonly JsonSerializerOptions _opts = new() { PropertyNameCaseInsensitive = true };

    public InMemoryEventRepository(IWebHostEnvironment env)
    {
        var path = Path.Combine(env.ContentRootPath, "Data", "events.json");
        _events = File.Exists(path)
            ? JsonSerializer.Deserialize<List<StrikeEvent>>(File.ReadAllText(path), _opts) ?? []
            : [];
    }

    public Task<IReadOnlyList<StrikeEvent>> GetAllAsync(CancellationToken ct = default) =>
        Task.FromResult<IReadOnlyList<StrikeEvent>>(_events.AsReadOnly());

    public Task<StrikeEvent?> GetByIdAsync(string id, CancellationToken ct = default) =>
        Task.FromResult(_events.FirstOrDefault(e => e.Id == id));

    public Task<IReadOnlyList<StrikeEvent>> SearchAsync(string? category, string? status, string? query, CancellationToken ct = default)
    {
        var q = _events.AsEnumerable();
        if (!string.IsNullOrEmpty(category)) q = q.Where(e => e.Category == category);
        if (!string.IsNullOrEmpty(status))   q = q.Where(e => e.VerificationStatus == status);
        if (!string.IsNullOrEmpty(query))
        {
            var ql = query.ToLowerInvariant();
            q = q.Where(e => e.Title.ToLower().Contains(ql) || e.Tags.Any(t => t.ToLower().Contains(ql)));
        }
        return Task.FromResult<IReadOnlyList<StrikeEvent>>(q.ToList().AsReadOnly());
    }
}
