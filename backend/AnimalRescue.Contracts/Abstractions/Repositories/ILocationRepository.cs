namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface ILocationRepository
{
    Task<IEnumerable<string>> GetLocationsWithViolationsAsyncTask();
}