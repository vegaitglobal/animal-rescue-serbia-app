using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IViolationService
{
    Task<ViolationDto?> GetAsync(Guid id);

    Task<AdminViolationDto?> GetForAdminAsync(Guid id);

    Task<PaginatedResponse<AdminViolationDto>> GetAllPaginatedAsync(ViolationFilterRequest violationFilterRequest, PaginationParameters paginationParameters);

    Task<IEnumerable<AdminViolationDto>> GetAllAsync();

    Task<IEnumerable<ViolationDto>> GetAllApprovedAsync();

    Task<ViolationDto> AddAsync(ViolationCreateDto violationDto);

    Task<AdminViolationDto> UpdateAsync(Guid id, AdminViolationUpdateDto updateDto);
}