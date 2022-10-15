using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IViolationService
{
    Task<ViolationDto?> GetAsync(Guid id);

    Task<IEnumerable<ViolationDto>> GetAllAsync();

    Task<ViolationDto> AddAsync(ViolationCreateDto violationDto);
}