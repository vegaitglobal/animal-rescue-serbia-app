using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/violations")]
    [ApiController]
    public class ViolationsAdminController : ControllerBase
    {
        private readonly IViolationService _violationService;

        public ViolationsAdminController(IViolationService violationService)
        {
            _violationService = violationService;
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
