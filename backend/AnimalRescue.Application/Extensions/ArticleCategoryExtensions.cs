using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions
{
    public static class ArticleCategoryExtensions
    {
        public static ArticleCategoryDto ToDto(this ArticleCategory articleCategory)
           => new()
           {
               Id = articleCategory.Id,
               Name = articleCategory.Name,
               IsEnabled = articleCategory.IsEnabled,
           };
    }
}
