using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface ILiteViolationsRepository
{
    Task<IEnumerable<LiteViolation>> GetAllAsync();

    Task<LiteViolation> AddAsync(LiteViolation liteViolation);

    Task<LiteViolation?> GetAsync(Guid id);
}