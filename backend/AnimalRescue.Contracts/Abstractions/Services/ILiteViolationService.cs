using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface ILiteViolationService
{
    Task<IEnumerable<LiteViolationDto>> GetAllAsync();

    Task<LiteViolationDto> AddAsync(LiteViolationCreateDto dto);

    Task<LiteViolationDto?> GetAsync(Guid id);
}