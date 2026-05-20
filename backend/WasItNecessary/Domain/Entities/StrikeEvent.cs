namespace WasItNecessary.Domain.Entities;
public class StrikeEvent
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Date { get; set; } = "";
    public string Category { get; set; } = "";
    public string VerificationStatus { get; set; } = "";
    public string Summary { get; set; } = "";
    public string TargetJustification { get; set; } = "";
    public bool WarningGiven { get; set; }
    public string? WarningDetails { get; set; }
    public List<string> Tags { get; set; } = [];
    public string VerifiedBy { get; set; } = "";
    public string LastUpdated { get; set; } = "";
    // Full JSON blobs for rich data
    public object Timeline { get; set; } = new();
    public object ClaimsVsFacts { get; set; } = new();
    public object Videos { get; set; } = new();
    public object? CraterComparison { get; set; }
    public object Casualties { get; set; } = new();
}
