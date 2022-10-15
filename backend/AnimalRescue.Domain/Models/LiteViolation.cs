namespace AnimalRescue.Domain.Models;

public class LiteViolation
{
    public Guid Id { get; set; }

    public string Location { get; set; }

    public virtual ViolationCategory ViolationCategory { get; set; }

    public virtual User User { get; set; }
}