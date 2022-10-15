namespace AnimalRescue.Contracts.Dto;

public class EmailRequestDto
{
    public IEnumerable<string> Recipients { get; set; } = Enumerable.Empty<string>();

    public string Subject { get; set; } = string.Empty;

    public string Body { get; set; } = string.Empty;
}