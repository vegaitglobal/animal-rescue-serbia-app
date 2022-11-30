using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/ViolationCategories")]
    [ApiController]
    [Authorize(Roles = Roles.ModeratorRole)]
    public class ViolationCategoriesAdminController : ControllerBase
    {
        private readonly IViolationCategoryService _violationCategoryService;

        public ViolationCategoriesAdminController(IViolationCategoryService violationCategoryService)
        {
            _violationCategoryService = violationCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViolationCategoryDto>>> GetAllAsync()
        {
            var categories = await _violationCategoryService.GetAllAsync();

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
