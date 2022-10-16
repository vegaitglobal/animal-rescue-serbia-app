using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Dto;

public class ArticleDto
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Decription { get; set; }

    public ArticleType Type { get; set; }

    public virtual ArticleCategoryDto Category { get; set; }

    public virtual MediaContentDto? MediaContent { get; set; }
}