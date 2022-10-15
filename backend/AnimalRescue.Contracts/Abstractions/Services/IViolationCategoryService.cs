using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IViolationCategoryService
{
    Task<ViolationCategoryDto?> GetAsync(Guid id);

    Task<IEnumerable<ViolationCategoryDto>> GetAllAsync();

    Task<IEnumerable<ViolationCategoryDto>> GetAllEnabledAsync();

    Task<ViolationCategoryDto> AddAsync(ViolationCategoryCreateDto violationCategory);

    Task<ViolationCategoryDto> UpdateAsync(Guid id, ViolationCategoryUpdateDto violationCategory);
}