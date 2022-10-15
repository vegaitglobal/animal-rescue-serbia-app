using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Dto;

public class AdminViolationUpdateDto
{
    public string? Description { get; set; }

    public string? AdminNotes { get; set; }

    public ViolationStatus Status { get; set; }
}