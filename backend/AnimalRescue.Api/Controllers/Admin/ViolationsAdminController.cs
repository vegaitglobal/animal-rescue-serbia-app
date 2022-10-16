using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AnimalRescue.Domain.Models;
using AnimalRescue.Contracts.FilterRequests;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/violations")]
    [ApiController]
    [Authorize(Roles = Roles.AdminRole)]
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
            var violation = await _violationService.GetAsync(id);

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
