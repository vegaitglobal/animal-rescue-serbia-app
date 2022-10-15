using AnimalRescue.Application.Extensions;
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

    public UserService(IUserRepository userRepository, ISecurityService securityService, IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _securityService = securityService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<UserDto> AddAsync(UserCreateDto dto)
    {
        if (dto.Password != dto.PasswordConfirm)
        {
            throw new ValidationException("Passwords do not match!");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Username = dto.Username,
            Password = _securityService.HashPassword(dto.Password),
        };

        var created = await _userRepository.AddAsync(user);

        return created.ToDto();
    }

    public async Task<UserDto?> GetCurrentUserAsync()
    {
        var userEmail = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");

        if (userEmail == null)
        {
            return null;
        }

        var user = await _userRepository.GetByEmailAsync(userEmail.Value);

        return user?.ToDto();
    }

    public Task<bool> ValidateUserCredentials(string email, string password)
        => _userRepository.ValidateUserExistsAsync(email, _securityService.HashPassword(password));
}