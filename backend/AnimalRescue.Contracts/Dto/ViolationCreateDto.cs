using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Contracts.Dto;

public class ViolationCreateDto
{
    public string Location { get; set; }

    public Guid ViolationCategoryId { get; set; }

    public string FullName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public IEnumerable<IFormFile>? Files { get; set; }
}