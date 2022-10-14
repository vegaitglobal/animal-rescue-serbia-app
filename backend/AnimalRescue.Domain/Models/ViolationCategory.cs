namespace AnimalRescue.Domain.Models;

public class ViolationCategory
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public bool IsEnabled { get; set; }
}