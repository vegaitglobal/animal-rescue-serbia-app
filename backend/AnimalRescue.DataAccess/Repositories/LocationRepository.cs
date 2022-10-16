using AnimalRescue.Contracts.Abstractions.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class LocationRepository : ILocationRepository
{
    private readonly AnimalRescueDbContext _dbContext;

    public LocationRepository(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<string>> GetLocationsWithViolationsAsyncTask()
        => await _dbContext
            .Violations
            .Select(v => v.Location)
            .Distinct()
            .ToListAsync();
}