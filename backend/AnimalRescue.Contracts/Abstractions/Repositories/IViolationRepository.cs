using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IViolationRepository
{
    Task<Violation?> GetAsync(Guid id);

    Task<IEnumerable<Violation>> GetAllAsync();

    Task<Violation> AddAsync(Violation violation);
}