using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/violations")]
    [ApiController]
    [Authorize(Roles = Roles.ModeratorRole)]
    public class ViolationsAdminController : ControllerBase
    {
        private readonly IViolationService _violationService;

        public ViolationsAdminController(IViolationService violationService)
        {
            _violationService = violationService;
        }

        [HttpGet("PaginatedViolations")]
        public async Task<ActionResult<PaginatedResponse<AdminViolationDto>>> GetAllForAdminAsync(
            [FromQuery] PaginationParameters violationParameters,
            [FromQuery] ViolationFilterRequest violationFilterRequest)
        {
            var violations = await _violationService.GetAllPaginatedAsync(violationFilterRequest, violationParameters);

            return Ok(violations);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminViolationDto>>> GetAllForAdminAsync()
        {
            var violations = await _violationService.GetAllAsync();

            return Ok(violations);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdminViolationDto>> GetViolationForAdminAsync(Guid id)
        {
            var violation = await _violationService.GetForAdminAsync(id);

            return violation is null
                ? NotFound()
                : Ok(violation);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AdminViolationDto>> UpdateAsync(Guid id, AdminViolationUpdateDto updateDto)
        {
            var updated = await _violationService.UpdateAsync(id, updateDto);

            return Ok(updated);
        }
    }
}
