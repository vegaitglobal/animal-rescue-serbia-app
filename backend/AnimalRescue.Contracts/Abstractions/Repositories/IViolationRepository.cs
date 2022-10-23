using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IViolationRepository
{
    Task<Violation?> GetAsync(Guid id);

    Task<IEnumerable<Violation>> GetAllAsync();

    Task<PaginatedResponse<Violation>> GetAllPaginatedAsync(ViolationFilterRequest violationFilterRequest, PaginationParameters paginationParameters);

    Task<IEnumerable<Violation>> GetAllApprovedAsync();

    Task<Violation?> GetApprovedAsync(Guid id);

    Task<Violation> AddAsync(Violation violation);

    Task<Violation> UpdateAsync(Violation existing);
}