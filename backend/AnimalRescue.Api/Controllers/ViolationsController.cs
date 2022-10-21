using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.UserRole)]
    public class ViolationsController : ControllerBase
    {
        private readonly IViolationService _violationService;

        public ViolationsController(IViolationService violationService)
        {
            _violationService = violationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViolationDto>>> GetAllAsync()
        {
            var violations = await _violationService.GetAllApprovedAsync();

            return Ok(violations);
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult> CreateAsync([FromForm] ViolationCreateDto dto)
        {
            var created = await _violationService.AddAsync(dto);

            return CreatedAtRoute("GetViolationAsync", new { id = created.Id }, null);
        }

        [HttpGet("{id}", Name = "GetViolationAsync")]
        public async Task<ActionResult<ViolationDto>> GetViolationAsync(Guid id)
        {
            var violation = await _violationService.GetApprovedAsync(id);

            return violation is null
                ? NotFound()
                : Ok(violation);
        }
    }
}
