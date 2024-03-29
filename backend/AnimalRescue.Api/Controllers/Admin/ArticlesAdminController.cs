﻿using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AnimalRescue.Api.Controllers.Admin;

[Route("api/admin/articles")]
[ApiController]
[Authorize(Roles = Roles.ModeratorRole)]
public class ArticlesAdminController : ControllerBase
{
    private readonly IArticleService _articleService;

    public ArticlesAdminController(IArticleService articleService)
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

    [HttpGet("{id}", Name = "GetArticleAsync")]
    public async Task<ActionResult<ArticleDto>> GetArticleAsync(Guid id)
    {
        var article = await _articleService.GetAsync(id);

        return article is null
            ? NotFound()
            : Ok(article);
    }

    [HttpPost]
    [ProducesResponseType((int)HttpStatusCode.Created)]
    public async Task<ActionResult> CreateAsync([FromForm] ArticleCreateDto dto)
    {
        var created = await _articleService.AddAsync(dto);

        return CreatedAtRoute("GetArticleAsync", new { id = created.Id }, null);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<ArticleDto>> PatchAsync(Guid id, [FromForm] ArticleUpdateDto updateDto)
    {
        var updated = await _articleService.PatchAsync(id, updateDto);

        return Ok(updated);
    }
}
