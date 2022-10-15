namespace AnimalRescue.Contracts.Dto;

public class ViolationDto
{
    public Guid Id { get; set; }

    public string Location { get; set; }

    public ViolationCategoryDto ViolationCategory { get; set; }

    public string FullName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }
}