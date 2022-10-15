namespace AnimalRescue.Contracts.Dto;

public class ViolationCategoryDto
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public bool IsEnabled { get; set; }
}