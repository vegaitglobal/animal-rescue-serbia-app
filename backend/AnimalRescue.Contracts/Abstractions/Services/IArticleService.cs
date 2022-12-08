using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IArticleService
{
    Task<ArticleDto?> GetAsync(Guid id);

    Task<PaginatedResponse<ArticleDto>> GetAllPaginatedAsync(ArticleFilterRequest filterRequest, PaginationParameters paginationParameters);

    Task<ArticleDto> AddAsync(ArticleCreateDto createDto);

    Task<ArticleDto> PatchAsync(Guid id, ArticleUpdateDto article);
}