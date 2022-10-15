using AnimalRescue.Application.Extensions;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Services;

public class ViolationService : IViolationService
{
    private readonly IViolationCategoryRepository _violationCategoryRepository;
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IViolationRepository _violationRepository;

    public ViolationService(
        IViolationCategoryRepository violationCategoryRepository,
        IUserService userService,
        IUserRepository userRepository,
        IViolationRepository violationRepository)
    {
        _violationCategoryRepository = violationCategoryRepository;
        _userService = userService;
        _userRepository = userRepository;
        _violationRepository = violationRepository;
    }

    public async Task<ViolationDto> AddAsync(ViolationCreateDto violationDto)
    {
        var category = await _violationCategoryRepository.GetAsync(violationDto.ViolationCategoryId);
        var currentUser = await _userService.GetCurrentUserAsync();

        if (category is null || currentUser is null)
        {
            throw new ValidationException("Bad request");
        }

        var user = await _userRepository.GetByEmailAsync(currentUser.Email);

        var violationToCreate = new Violation
        {
            Id = Guid.NewGuid(),
            Location = violationDto.Location,
            User = user!,
            ViolationCategory = category,
            Address = violationDto.Address,
            FullName = violationDto.FullName,
            PhoneNumber = violationDto.PhoneNumber,
        };

        var created = await _violationRepository.AddAsync(violationToCreate);

        return created.ToDto();
    }

    public async Task<IEnumerable<ViolationDto>> GetAllAsync()
    {
        var violations = await _violationRepository.GetAllAsync();

        return violations.Select(violation => violation.ToDto());
    }

    public async Task<ViolationDto?> GetAsync(Guid id)
    {
        var entity = await _violationRepository.GetAsync(id);

        return entity?.ToDto();
    }
}