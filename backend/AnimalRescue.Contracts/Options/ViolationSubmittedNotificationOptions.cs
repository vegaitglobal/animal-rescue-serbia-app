namespace AnimalRescue.Contracts.Options;

public class ViolationSubmittedNotificationOptions
{
    public IList<string> Recipients { get; set; } = new List<string>();

    public string Subject { get; set; } = string.Empty;

    public string UrlTemplate { get; set; } = string.Empty;
}