using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IUserService
{
    Task<UserDto?> GetCurrentUserAsync();

    Task<bool> ValidateUserCredentials(string email, string password);

    Task<UserDto> AddAsync(UserCreateDto dto);
}