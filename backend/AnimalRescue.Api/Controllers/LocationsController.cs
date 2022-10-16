using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/locations")]
    [ApiController]
    [Authorize(Roles = Roles.UserRole)]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationsService;

        public LocationController(ILocationService locationsService)
        {
            _locationsService = locationsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetLocationsAsync()
        {
            var locations = await _locationsService.GetAllAsync();

            return Ok(locations);
        }
    }
}
