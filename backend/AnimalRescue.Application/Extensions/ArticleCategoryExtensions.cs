using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public static ArticleCategory ToEntity(this ArticleCategoryUpdateDto articleCategory, Guid id)
            => new()
            {
                Id = id,
                Name = articleCategory.Name,
                IsEnabled = articleCategory.IsEnabled,
            };
    }
}
