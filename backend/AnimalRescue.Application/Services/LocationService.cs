using AnimalRescue.Application.Helpers;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using System.Text;
using System.Text.Json;
using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Application.Services;

public class LocationService : ILocationService
{
    private readonly ILocationRepository _locationRepository;

    public LocationService(ILocationRepository locationRepository)
    {
        _locationRepository = locationRepository;
    }

    public async Task<IEnumerable<string>> GetAllAsync()
    {
        var client = new HttpClient
        {
            BaseAddress = new Uri("https://countriesnow.space"),
        };

        using var jsonContent = new StringContent(
            JsonSerializer.Serialize(new
            {
                country = "serbia",
            }),
            Encoding.UTF8,
            "application/json");

        var response = await client.PostAsync("/api/v0.1/countries/cities", jsonContent);
        var responseStr = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

        var countryResponse = JsonHelper.Deserialize<CountryResponseDto>(responseStr);

        return countryResponse.Data.Append("Stapar").OrderBy(location => location);
    }

    public Task<IEnumerable<string>> GetLocationsWithViolationsAsyncTask()
        => _locationRepository.GetLocationsWithViolationsAsyncTask();
}
