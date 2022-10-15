using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IViolationRepository
{
    Task<Violation?> GetAsync(Guid id);

    Task<IEnumerable<Violation>> GetAllAsync();

    Task<IEnumerable<Violation>> GetAllApprovedAsync();

    Task<Violation> AddAsync(Violation violation);

    Task<Violation> UpdateAsync(Violation existing);
}