using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class LiteViolationsRepository : ILiteViolationsRepository
{
    private readonly AnimalRescueDbContext _dbContext;

    public LiteViolationsRepository(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<LiteViolation> AddAsync(LiteViolation liteViolation)
    {
        var created = await _dbContext.AddAsync(liteViolation);

        await _dbContext.SaveChangesAsync();

        return created.Entity;
    }

    public async Task<IEnumerable<LiteViolation>> GetAllAsync()
        => await _dbContext
            .LiteViolations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .AsNoTracking()
            .ToListAsync();

    public async Task<LiteViolation?> GetAsync(Guid id)
        => await _dbContext
            .LiteViolations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .FirstOrDefaultAsync(entity => entity.Id == id);
}