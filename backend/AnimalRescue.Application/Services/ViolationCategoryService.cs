using AnimalRescue.Application.Extensions;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Services;

public class ViolationCategoryService : IViolationCategoryService
{
    private readonly IViolationCategoryRepository _violationCategoryRepository;

    public ViolationCategoryService(IViolationCategoryRepository violationCategoryRepository)
    {
        _violationCategoryRepository = violationCategoryRepository;
    }

    public async Task<ViolationCategoryDto> AddAsync(ViolationCategoryCreateDto violationCategory)
    {
        var violationCategoryToCreate = new ViolationCategory
        {
            Id = Guid.NewGuid(),
            Name = violationCategory.Name,
            IsEnabled = true,
        };

        var created = await _violationCategoryRepository.AddAsync(violationCategoryToCreate);

        return created.ToDto();
    }

    public async Task<IEnumerable<ViolationCategoryDto>> GetAllAsync()
    {
        var violationCategories = await _violationCategoryRepository.GetAllAsync();

        return violationCategories.Select(violationCategory => violationCategory.ToDto());
    }

    public async Task<IEnumerable<ViolationCategoryDto>> GetAllEnabledAsync()
    {
        var violationCategories = await _violationCategoryRepository.GetAllEnabledAsync();

        return violationCategories.Select(violationCategory => violationCategory.ToDto());
    }

    public async Task<ViolationCategoryDto?> GetAsync(Guid id)
    {
        var entity = await _violationCategoryRepository.GetAsync(id);

        return entity?.ToDto();
    }

    public async Task<ViolationCategoryDto> UpdateAsync(Guid id, ViolationCategoryUpdateDto violationCategory)
    {
        var existingEntity = await _violationCategoryRepository.GetAsync(id);
        if (existingEntity is null)
        {
            throw new EntityNotFoundException($"Violation category with id: '{id}' does not exist!");
        }

        existingEntity.IsEnabled = violationCategory.IsEnabled;
        existingEntity.Name = violationCategory.Name;

        var updatedEntity = await _violationCategoryRepository.UpdateAsync(existingEntity);

        return updatedEntity.ToDto();
    }
}