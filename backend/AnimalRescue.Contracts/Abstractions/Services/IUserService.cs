using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IUserService
{
    Task<UserDto?> GetCurrentUserAsync();

    Task<bool> ValidateUserCredentials(string email, string password);

    Task<UserDto> AddAsync(UserCreateDto userCreateDto);

    Task<UserDto> AdminUpdateAsync(Guid id, UserAdminUpdateDto userUpdateDto);

    Task<UserDto> UpdateAsync(Guid id, UserUpdateDto userUpdateDto);

    Task<UserDto> UpdateCredentialsAsync(Guid id, UserCredentialsUpdateDto userUpdateDto);

    Task<UserDto?> GetByIdAsync(Guid id);

    Task<IEnumerable<UserDto>> GetAllAsync();
}