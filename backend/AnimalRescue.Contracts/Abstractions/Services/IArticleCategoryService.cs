
using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services
{
    public interface IArticleCategoryService
    {
        Task<ArticleCategoryDto?> GetAsync(Guid id);

        Task<IEnumerable<ArticleCategoryDto>> GetAllAsync();

        Task<IEnumerable<ArticleCategoryDto>> GetAllEnabledAsync();

        Task<ArticleCategoryDto> AddAsync(ArticleCategoryCreateDto violationCategory);

        Task<ArticleCategoryDto> UpdateAsync(Guid id, ArticleCategoryUpdateDto violationCategory);
    }
}
