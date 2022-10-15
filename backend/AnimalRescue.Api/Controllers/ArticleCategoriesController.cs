using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers;

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
    public async Task<ActionResult<IEnumerable<ArticleCategoryDto>>> GetAllAsync()
    {
        var categories = await _articleCategoryService.GetAllEnabledAsync();

        return Ok(categories);
    }
}
