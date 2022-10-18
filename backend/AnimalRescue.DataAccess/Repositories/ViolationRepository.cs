using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
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

    public async Task<IEnumerable<Violation>> GetAllApprovedAsync()
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .AsNoTracking()
            .Where(v => v.Status == ViolationStatus.Accepted || v.Status == ViolationStatus.Processed)
            .ToListAsync();

    public async Task<IEnumerable<Violation>> GetAllAsync()
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .AsNoTracking()
            .ToListAsync();

    public async Task<PaginatedResponse<Violation>> GetAllPaginatedAsync(ViolationFilterRequest violationFilterRequest, PaginationParameters paginationParameters)
    {
        var filteredEntities = await GetAllFilteredAsync(violationFilterRequest);

        var paginatedEntities = filteredEntities
            .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
            .Take(paginationParameters.PageSize);

        return new PaginatedResponse<Violation>()
        {
            PageNumber = paginationParameters.PageNumber,
            FilteredCount = filteredEntities.Count(),
            Entities = paginatedEntities
        };
    }

    public async Task<Violation?> GetAsync(Guid id)
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .FirstOrDefaultAsync(entity => entity.Id == id);

    public async Task<Violation> UpdateAsync(Violation violation)
    {
        var updated = _dbContext.Violations.Update(violation);

        await _dbContext.SaveChangesAsync();

        return updated.Entity;
    }

    private async Task<IEnumerable<Violation>> GetAllFilteredAsync(ViolationFilterRequest violationFilterRequest)
        => await _dbContext
            .Violations
            .Include(lv => lv.User)
            .Include(lv => lv.ViolationCategory)
            .Where(x => (violationFilterRequest.Location == null || violationFilterRequest.Location == x.Location) &&
                        (violationFilterRequest.CategoryId == null || violationFilterRequest.CategoryId == x.ViolationCategory.Id) &&
                        (violationFilterRequest.ViolationStatus == null || violationFilterRequest.ViolationStatus == x.Status))
            .Where(x =>
                        violationFilterRequest.SearchText == null || x.Address.Contains(violationFilterRequest.SearchText) ||
                        (x.Description != null &&  x.Description.Contains(violationFilterRequest.SearchText)))
            .AsNoTracking()
            .ToListAsync();
}