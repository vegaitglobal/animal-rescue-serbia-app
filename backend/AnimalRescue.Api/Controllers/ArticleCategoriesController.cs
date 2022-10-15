using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleCategoriesController : ControllerBase
    {
        private readonly IArticleCategoryService _articleCategoryService;

        public ArticleCategoriesController(IArticleCategoryService articleCategoryService)
        {
            _articleCategoryService = articleCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(bool? onlyEnabled)
        {
            var categories = onlyEnabled.GetValueOrDefault()
                ? await _articleCategoryService.GetAllEnabledAsync()
                : await _articleCategoryService.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id}", Name = "GetArticleCategoryAsync")]
        public async Task<IActionResult> GetArticleCategoryAsync(Guid id)
        {
            var category = await _articleCategoryService.GetAsync(id);

            return category is null
                ? NotFound()
                : Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(ArticleCategoryCreateDto categoryCreateDto)
        {
            var category = await _articleCategoryService.AddAsync(categoryCreateDto);

            return CreatedAtRoute("GetArticleCategoryAsync", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(Guid id, ArticleCategoryUpdateDto categoryCreateDto)
        {
            var updatedEntity = await _articleCategoryService.UpdateAsync(id, categoryCreateDto);

            return Ok(updatedEntity);
        }

    }
}
