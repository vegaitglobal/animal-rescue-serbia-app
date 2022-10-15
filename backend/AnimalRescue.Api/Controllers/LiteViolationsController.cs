using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LiteViolationsController : ControllerBase
    {
        private readonly ILiteViolationService _liteViolationService;

        public LiteViolationsController(ILiteViolationService liteViolationService)
        {
            _liteViolationService = liteViolationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiteViolationDto>>> GetAllAsync()
        {
            var violations = await _liteViolationService.GetAllAsync();

            return Ok(violations);
        }

        [HttpPost]
        public async Task<ActionResult<LiteViolationDto>> CreateAsync(LiteViolationCreateDto dto)
        {
            var created = await _liteViolationService.AddAsync(dto);

            return CreatedAtRoute("GetLiteViolationAsync", new { id = created.Id }, created);
        }

        [HttpGet("{id}", Name = "GetLiteViolationAsync")]
        public async Task<ActionResult<LiteViolationDto>> GetLiteViolationAsync(Guid id)
        {
            var violation = await _liteViolationService.GetAsync(id);

            return violation is null
                ? NotFound()
                : Ok(violation);
        }
    }
}
