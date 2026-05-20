using WasItNecessary.Domain.Entities;
namespace WasItNecessary.Domain.Interfaces;
public interface IEventRepository
{
    Task<IReadOnlyList<StrikeEvent>> GetAllAsync(CancellationToken ct = default);
    Task<StrikeEvent?> GetByIdAsync(string id, CancellationToken ct = default);
    Task<IReadOnlyList<StrikeEvent>> SearchAsync(string? category, string? status, string? query, CancellationToken ct = default);
}
