using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Dto;

public class AdminViolationDto
{
    public Guid Id { get; set; }

    public string Location { get; set; }

    public ViolationCategoryDto ViolationCategory { get; set; }

    public string FullName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public string? Description { get; set; }

    public string? AdminNotes { get; set; }

    public ViolationStatus Status { get; set; }

    public IEnumerable<MediaContentDto> MediaContent { get; set; }
}