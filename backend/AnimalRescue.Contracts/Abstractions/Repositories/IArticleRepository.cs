using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Abstractions.Repositories;

public interface IArticleRepository
{
    Task<Article?> GetAsync(Guid id);

    Task<PaginatedResponse<Article>> GetAllPaginatedAsync(ArticleFilterRequest violationFilterRequest, PaginationParameters paginationParameters);

    Task<Article> AddAsync(Article article);

    Task<Article> UpdateAsync(Article article);
}