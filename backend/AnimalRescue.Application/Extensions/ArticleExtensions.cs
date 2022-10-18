using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class ArticleExtensions
{
    public static ArticleDto ToDto(this Article article)
        => new()
        {
            Id = article.Id,
            Category = article.Category.ToDto(),
            Decription = article.Decription,
            Title = article.Title,
            Type = article.Type,
            MediaContent = article.MediaContent?.ToDto(),
        };
}