using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AnimalRescueDbContext _context;

    public UserRepository(AnimalRescueDbContext context)
    {
        _context = context;
    }

    public async Task<User> AddAsync(User user)
    {
        var created = await _context.AddAsync(user);

        await _context.SaveChangesAsync();

        return created.Entity;
    }

    public Task<User?> GetByEmailAsync(string email)
        => _context
            .Users
            .FirstOrDefaultAsync(user => user.Email == email);

    public Task<bool> ValidateUserExistsAsync(string email, string passwordHash)
        => _context
            .Users
            .AnyAsync(user => user.Email == email && user.Password == passwordHash);
}