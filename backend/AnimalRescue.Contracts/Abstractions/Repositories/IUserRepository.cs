using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IUserRepository
{
    Task<bool> ValidateUserExistsAsync(string email, string passwordHash);

    Task<User?> GetByEmailAsync(string email);

    Task<User> AddAsync(User user);
}