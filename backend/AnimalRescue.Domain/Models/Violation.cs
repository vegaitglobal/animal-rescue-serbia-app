namespace AnimalRescue.Domain.Models;

public class Violation : LiteViolation
{
    public string FullName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public string? Description { get; set; }

    public string? AdminNotes { get; set; }

    public virtual IEnumerable<MediaContent> MediaContent { get; set; } = new List<MediaContent>();

    public ViolationStatus Status { get; set; }
}

