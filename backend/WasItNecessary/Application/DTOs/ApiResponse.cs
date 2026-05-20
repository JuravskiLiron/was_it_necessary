namespace WasItNecessary.Application.DTOs;
public record ApiResponse<T>(bool Success, T? Data, string? Error = null, int Total = 0);
