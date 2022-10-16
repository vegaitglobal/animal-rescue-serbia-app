using AnimalRescue.Application.Extensions;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Services
{
    public class ArticleCategoryService : IArticleCategoryService
    {
        private readonly IArticleCategoryRepository _articleCategoryRepository;

        public ArticleCategoryService(IArticleCategoryRepository articleCategoryRepository)
        {
            _articleCategoryRepository = articleCategoryRepository;
        }

        public async Task<ArticleCategoryDto> AddAsync(ArticleCategoryCreateDto articleCategory)
        {
            var articleCategoryToCreate = new ArticleCategory
            {
                Id = Guid.NewGuid(),
                Name = articleCategory.Name,
                IsEnabled = true,
            };

            var created = await _articleCategoryRepository.AddAsync(articleCategoryToCreate);

            return created.ToDto();
        }

        public async Task<IEnumerable<ArticleCategoryDto>> GetAllAsync()
        {
            var articleCategories = await _articleCategoryRepository.GetAllAsync();

            return articleCategories.Select(articleCategory => articleCategory.ToDto());
        }

        public async Task<IEnumerable<ArticleCategoryDto>> GetAllEnabledAsync()
        {
            var articleCategories = await _articleCategoryRepository.GetAllEnabledAsync();

            return articleCategories.Select(articleCategory => articleCategory.ToDto());
        }

        public async Task<ArticleCategoryDto?> GetAsync(Guid id)
        {
            var entity = await _articleCategoryRepository.GetAsync(id);

            return entity?.ToDto();
        }

        public async Task<ArticleCategoryDto> UpdateAsync(Guid id, ArticleCategoryUpdateDto articleCategory)
        {
            var existingEntity = await _articleCategoryRepository.GetAsync(id);
            if (existingEntity is null)
            {
                throw new EntityNotFoundException($"Article category with id: '{id}' does not exist!");
            }

            existingEntity.IsEnabled = articleCategory.IsEnabled;
            existingEntity.Name = articleCategory.Name;

            var updatedEntity = await _articleCategoryRepository.UpdateAsync(existingEntity);

            return updatedEntity.ToDto();
        }
    }
}
