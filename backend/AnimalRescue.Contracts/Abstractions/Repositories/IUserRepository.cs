using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IUserRepository
{
    Task<bool> ValidateUserExistsAsync(string email, string passwordHash);

    Task<User?> GetByEmailAsync(string email);

    Task<User?> GetByIdAsync(Guid id);

    Task<User?> GetByUsernameAsync(string username);

    Task<User> AddAsync(User user);

    Task<User> UpdateAsync(User user);

    Task<IEnumerable<User>> GetAllAsync();
}