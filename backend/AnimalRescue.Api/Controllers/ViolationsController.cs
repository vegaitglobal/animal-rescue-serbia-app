using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViolationsController : ControllerBase
    {
        private readonly IViolationService _violationService;

        public ViolationsController(IViolationService violationService)
        {
            _violationService = violationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiteViolationDto>>> GetAllAsync()
        {
            var violations = await _violationService.GetAllAsync();

            return Ok(violations);
        }

        [HttpPost]
        public async Task<ActionResult<LiteViolationDto>> CreateAsync(ViolationCreateDto dto)
        {
            var created = await _violationService.AddAsync(dto);

            return CreatedAtRoute("GetViolationAsync", new { id = created.Id }, created);
        }

        [HttpGet("{id}", Name = "GetViolationAsync")]
        public async Task<ActionResult<LiteViolationDto>> GetViolationAsync(Guid id)
        {
            var violation = await _violationService.GetAsync(id);

            return violation is null
                ? NotFound()
                : Ok(violation);
        }
    }
}
