using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = Roles.UserRole)]
public class ArticlesController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticlesController(IArticleService articleService)
    {
        _articleService = articleService;
    }

    [HttpGet("PaginatedArticles")]
    public async Task<ActionResult<PaginatedResponse<ArticleDto>>> GetAllAsync(
        [FromQuery] PaginationParameters violationParameters,
        [FromQuery] ArticleFilterRequest filterRequest)
    {
        var violations = await _articleService.GetAllPaginatedAsync(filterRequest, violationParameters);

        return Ok(violations);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ArticleDto>> GetAsync(Guid id)
    {
        var article = await _articleService.GetAsync(id);

        return article is null
            ? NotFound()
            : Ok(article);
    }
}
