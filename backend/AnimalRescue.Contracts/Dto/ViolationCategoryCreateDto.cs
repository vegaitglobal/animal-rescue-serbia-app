using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Dto;

public class ViolationCategoryCreateDto
{
    [Required(AllowEmptyStrings = false)]
    public string Name { get; set; }
}