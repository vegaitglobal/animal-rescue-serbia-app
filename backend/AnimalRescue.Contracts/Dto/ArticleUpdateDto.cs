using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Contracts.Dto;

public class ArticleUpdateDto
{
    public string? Title { get; set; }

    public string? Decription { get; set; }

    public ArticleType? Type { get; set; }

    public Guid? CategoryId { get; set; }

    public IFormFile? File { get; set; }
}