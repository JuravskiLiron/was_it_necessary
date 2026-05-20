using System.Text.Json.Serialization;

namespace WasItNecessary.Models;

public enum EventCategory { hospital, tunnel, weapons_depot, command_center, rocket_launch }
public enum VerificationStatus { verified, disputed, debunked }
public enum SourceType { official, media, osint, satellite }
public enum EvidenceType { video, image, document, satellite, radar }

public class StrikeEvent
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public double[] Coordinates { get; set; } = [];
    public string Date { get; set; } = "";
    public EventCategory Category { get; set; }
    public VerificationStatus VerificationStatus { get; set; }
    public string Summary { get; set; } = "";
    public string FullDescription { get; set; } = "";
    public string TargetJustification { get; set; } = "";
    public bool WarningGiven { get; set; }
    public string? WarningDetails { get; set; }
    public CasualtyInfo Casualties { get; set; } = new();
    public List<FalseClaim> FalseClaims { get; set; } = [];
    public List<EventSource> Sources { get; set; } = [];
    public List<Evidence> Evidence { get; set; } = [];
    public List<string> Tags { get; set; } = [];
    public string VerifiedBy { get; set; } = "";
    public string LastUpdated { get; set; } = "";
}

public class CasualtyInfo
{
    public int Reported { get; set; }
    public int Verified { get; set; }
    public string Notes { get; set; } = "";
}

public class FalseClaim
{
    public string Claim { get; set; } = "";
    public string ClaimedBy { get; set; } = "";
    public string DebunkedBy { get; set; } = "";
    public string DebunkSummary { get; set; } = "";
    public List<string> Sources { get; set; } = [];
}

public class EventSource
{
    public string Id { get; set; } = "";
    public string Title { get; set; } = "";
    public string Url { get; set; } = "";
    public string Publisher { get; set; } = "";
    public string PublishedAt { get; set; } = "";
    public SourceType Type { get; set; }
    public int Credibility { get; set; }
    public string Excerpt { get; set; } = "";
}

public class Evidence
{
    public string Id { get; set; } = "";
    public EvidenceType Type { get; set; }
    public string Url { get; set; } = "";
    public string? ThumbnailUrl { get; set; }
    public string Description { get; set; } = "";
    public string CapturedAt { get; set; } = "";
    public string Source { get; set; } = "";
}

public class ApiResponse<T>
{
    public bool Success { get; set; } = true;
    public T? Data { get; set; }
    public string? Error { get; set; }
    public int Total { get; set; }
}
