using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class ViolationRepository : IViolationRepository
{
    private readonly AnimalRescueDbContext _dbContext;

    public ViolationRepository(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Violation> AddAsync(Violation violation)
    {
        var created = await _dbContext.AddAsync(violation);

        await _dbContext.SaveChangesAsync();

        return created.Entity;
    }

    public async Task<IEnumerable<Violation>> GetAllAsync()
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .AsNoTracking()
            .ToListAsync();

    public async Task<Violation?> GetAsync(Guid id)
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .FirstOrDefaultAsync(entity => entity.Id == id);
}