using System.Text.Json.Serialization;

namespace AnimalRescue.Contracts.Dto;

public class LiteViolationCreateDto
{
    public string Location { get; set; }

    public Guid ViolationCategoryId { get; set; }
}