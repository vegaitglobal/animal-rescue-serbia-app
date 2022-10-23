using AnimalRescue.Application.Extensions;
using AnimalRescue.Application.Validators;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ISecurityService _securityService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserValidator _userValidator;

    public UserService(IUserRepository userRepository, ISecurityService securityService, IHttpContextAccessor httpContextAccessor,UserValidator userValidator)
    {
        _userRepository = userRepository;
        _securityService = securityService;
        _httpContextAccessor = httpContextAccessor;
        _userValidator = userValidator;
    }

    public async Task<UserDto> AddAsync(UserCreateDto userCreateDto)
    {
        await _userValidator.ValidateUser(userCreateDto);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = userCreateDto.Email,
            FirstName = userCreateDto.FirstName,
            LastName = userCreateDto.LastName,
            Username = userCreateDto.Username,
            Password = _securityService.HashPassword(userCreateDto.Password),
            Role = UserRoles.User,
            IsActive = true,
        };

        var created = await _userRepository.AddAsync(user);

        return created.ToDto();
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users.Select(user => user.ToDto());
    }

    public async Task<UserDto?> GetByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        return user?.ToDto();
    }

    public async Task<UserDto?> GetCurrentUserAsync()
    {
        var userEmail = _httpContextAccessor
            .HttpContext?
            .User
            .Claims.
            FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");

        if (userEmail == null)
        {
            return null;
        }

        var user = await _userRepository.GetByEmailAsync(userEmail.Value);

        return user?.ToDto();
    }

    public async Task<UserDto> UpdateAsync(Guid id, UserUpdateDto userUpdateDto)
    {
        var userToUpdate = await _userRepository.GetByIdAsync(id);

        if (userToUpdate is null)
        {
            throw new EntityNotFoundException("User you are trying to update does not exist!");
        }

        var currentUser = await GetCurrentUserAsync();

        if (userToUpdate.Id == currentUser?.Id && userToUpdate.Role != userUpdateDto.Role)
        {
            throw new ValidationException("Cannot update your own role!");
        }

        userToUpdate.Username = userUpdateDto.Username;
        userToUpdate.FirstName = userUpdateDto.FirstName;
        userToUpdate.LastName = userUpdateDto.LastName;
        userToUpdate.Role = userUpdateDto.Role;
        userToUpdate.IsActive = userUpdateDto.IsActive;

        var updated = await _userRepository.UpdateAsync(userToUpdate);

        return updated.ToDto();
    }

    public Task<bool> ValidateUserCredentials(string email, string password)
        => _userRepository.ValidateUserExistsAsync(email, _securityService.HashPassword(password));
}