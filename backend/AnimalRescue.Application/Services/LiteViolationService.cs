using AnimalRescue.Application.Extensions;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Services;

public class LiteViolationService : ILiteViolationService
{
    private readonly ILiteViolationsRepository _liteViolationsRepository;
    private readonly IViolationCategoryRepository _violationCategoryRepository;
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;

    public LiteViolationService(
        ILiteViolationsRepository liteViolationsRepository,
        IViolationCategoryRepository violationCategoryRepository,
        IUserService userService,
        IUserRepository userRepository)
    {
        _liteViolationsRepository = liteViolationsRepository;
        _violationCategoryRepository = violationCategoryRepository;
        _userService = userService;
        _userRepository = userRepository;
    }

    public async Task<LiteViolationDto> AddAsync(LiteViolationCreateDto dto)
    {
        var category = await _violationCategoryRepository.GetAsync(dto.ViolationCategoryId);
        var currentUser = await _userService.GetCurrentUserAsync();

        if (category is null || currentUser is null)
        {
            throw new ValidationException("Bad request");
        }

        var user = await _userRepository.GetByEmailAsync(currentUser.Email);

        var violationToCreate = new LiteViolation
        {
            Id = Guid.NewGuid(),
            Location = dto.Location,
            User = user!,
            ViolationCategory = category,
        };

        var created = await _liteViolationsRepository.AddAsync(violationToCreate);

        return created.ToDto();
    }

    public async Task<IEnumerable<LiteViolationDto>> GetAllAsync()
    {
        var violations = await _liteViolationsRepository.GetAllAsync();

        return violations.Select(violation => violation.ToDto());
    }

    public async Task<LiteViolationDto?> GetAsync(Guid id)
    {
        var entity = await _liteViolationsRepository.GetAsync(id);

        return entity?.ToDto();
    }
}