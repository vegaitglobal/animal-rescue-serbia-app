using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class ViolationCategoryRepository : IViolationCategoryRepository
{
    private readonly AnimalRescueDbContext _dbContext;

    public ViolationCategoryRepository(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ViolationCategory> AddAsync(ViolationCategory violationCategory)
    {
        var created = await _dbContext.AddAsync(violationCategory);

        await _dbContext.SaveChangesAsync();

        return created.Entity;
    }

    public async Task<IEnumerable<ViolationCategory>> GetAllAsync()
        => await _dbContext
            .ViolationCategories
            .AsNoTracking()
            .ToListAsync();

    public async Task<IEnumerable<ViolationCategory>> GetAllEnabledAsync()
        => await _dbContext
            .ViolationCategories
            .Where(category=> category.IsEnabled)
            .AsNoTracking()
            .ToListAsync();

    public async Task<ViolationCategory?> GetAsync(Guid id)
        => await _dbContext
            .ViolationCategories
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id == id);

    public async Task<ViolationCategory> UpdateAsync(ViolationCategory violationCategory)
    {
        var updated = _dbContext.ViolationCategories.Update(violationCategory);

        await _dbContext.SaveChangesAsync();

        return updated.Entity;
    }
}
