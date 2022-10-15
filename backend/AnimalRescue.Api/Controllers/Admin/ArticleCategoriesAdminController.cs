using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/ArticleCategories")]
    [ApiController]
    [Authorize(Roles = Roles.AdminRole)]
    public class ArticleCategoriesAdminController : ControllerBase
    {
        private readonly IArticleCategoryService _articleCategoryService;

        public ArticleCategoriesAdminController(IArticleCategoryService articleCategoryService)
        {
            _articleCategoryService = articleCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleCategoryDto>>> GetAllAsync()
        {
            var categories = await _articleCategoryService.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id}", Name = "GetArticleCategoryAsync")]
        public async Task<ActionResult<ArticleCategoryDto>> GetArticleCategoryAsync(Guid id)
        {
            var category = await _articleCategoryService.GetAsync(id);

            return category is null
                ? NotFound()
                : Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<ArticleCategoryDto>> CreateAsync(ArticleCategoryCreateDto categoryCreateDto)
        {
            var category = await _articleCategoryService.AddAsync(categoryCreateDto);

            return CreatedAtRoute("GetArticleCategoryAsync", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ArticleCategoryDto>> UpdateAsync(Guid id, ArticleCategoryUpdateDto categoryCreateDto)
        {
            var updatedEntity = await _articleCategoryService.UpdateAsync(id, categoryCreateDto);

            return Ok(updatedEntity);
        }
    }
}
