using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/Locations")]
    [ApiController]
    public class LocationsAdminController : ControllerBase
    {
        private readonly ILocationService _locationsService;

        public LocationsAdminController(ILocationService locationsService)
        {
            _locationsService = locationsService;
        }

        [HttpGet("/api/admin/LocationsWithViolations")]
        [Authorize(Roles = Roles.AdminRole)]
        public async Task<ActionResult<IEnumerable<string>>> GetLocationsWithViolationsAsync()
        {
            var locations = await _locationsService.GetLocationsWithViolationsAsyncTask();

            return Ok(locations);
        }
    }
}
