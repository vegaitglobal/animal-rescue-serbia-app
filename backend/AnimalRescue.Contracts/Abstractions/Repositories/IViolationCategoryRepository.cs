using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IViolationCategoryRepository
{
    Task<ViolationCategory?> GetAsync(Guid id);

    Task<ViolationCategory?> GetByNameAsync(string name);

    Task<IEnumerable<ViolationCategory>> GetAllAsync();

    Task<IEnumerable<ViolationCategory>> GetAllEnabledAsync();

    Task<ViolationCategory> AddAsync(ViolationCategory violationCategory);

    Task<ViolationCategory> UpdateAsync(ViolationCategory violationCategory);
}