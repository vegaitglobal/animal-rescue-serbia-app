namespace AnimalRescue.Contracts.Dto;

public class ViolationReportDto
{
    public Guid Id { get; set; }

    public string Location { get; set; }

    public ViolationCategoryDto ViolationCategory { get; set; }
}