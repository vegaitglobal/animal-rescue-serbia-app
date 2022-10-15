using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IViolationService
{
    Task<ViolationDto?> GetAsync(Guid id);

    Task<IEnumerable<AdminViolationDto>> GetAllAsync();

    Task<IEnumerable<ViolationDto>> GetAllApprovedAsync();

    Task<ViolationDto> AddAsync(ViolationCreateDto violationDto);

    Task<AdminViolationDto> UpdateAsync(Guid id, AdminViolationUpdateDto updateDto);
}