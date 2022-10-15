using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViolationCategoriesController : ControllerBase
    {
        private readonly IViolationCategoryService _violationCategoryService;

        public ViolationCategoriesController(IViolationCategoryService violationCategoryService)
        {
            _violationCategoryService = violationCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViolationCategoryDto>>> GetAllAsync(bool? onlyEnabled)
        {
            var categories = onlyEnabled.GetValueOrDefault()
                ? await _violationCategoryService.GetAllEnabledAsync()
                : await _violationCategoryService.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id}", Name = "GetAsync")]
        public async Task<ActionResult<ViolationCategoryDto>> GetAsync(Guid id)
        {
            var category = await _violationCategoryService.GetAsync(id);

            return category is null
                ? NotFound()
                : Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<ViolationCategoryDto>> CreateAsync(ViolationCategoryCreateDto categoryCreateDto)
        {
            var category = await _violationCategoryService.AddAsync(categoryCreateDto);

            return CreatedAtRoute("GetAsync", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ViolationCategoryDto>> UpdateAsync(Guid id, ViolationCategoryUpdateDto categoryCreateDto)
        {
            var updatedEntity = await _violationCategoryService.UpdateAsync(id, categoryCreateDto);

            return Ok(updatedEntity);
        }

    }
}
