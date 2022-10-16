using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories;

public class ArticleRepository : IArticleRepository
{
    private readonly AnimalRescueDbContext _dbContext;

    public ArticleRepository(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Article> AddAsync(Article article)
    {
        var created = await _dbContext.AddAsync(article);

        await _dbContext.SaveChangesAsync();

        return created.Entity;
    }

    public async Task<PaginatedResponse<Article>> GetAllPaginatedAsync(ArticleFilterRequest violationFilterRequest, PaginationParameters paginationParameters)
    {
        var filteredEntities = await GetAllFilteredAsync(violationFilterRequest);

        var paginatedEntities = filteredEntities
            .Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize)
            .Take(paginationParameters.PageSize);

        return new PaginatedResponse<Article>
        {
            PageNumber = paginationParameters.PageNumber,
            FilteredCount = filteredEntities.Count(),
            Entities = paginatedEntities,
        };
    }

    public async Task<Article?> GetAsync(Guid id)
        => await _dbContext
            .Articles
                .Include(lv => lv.User)
                .Include(lv => lv.Category)
            .FirstOrDefaultAsync(entity => entity.Id == id);

    public async Task<Article> UpdateAsync(Article article)
    {
        var updated = _dbContext.Articles.Update(article);

        await _dbContext.SaveChangesAsync();

        return updated.Entity;
    }

    private async Task<IEnumerable<Article>> GetAllFilteredAsync(ArticleFilterRequest filterRequest)
        => await _dbContext
            .Articles
                .Include(lv => lv.User)
                .Include(lv => lv.Category)
            .Where(x => filterRequest.Type == null || x.Type == filterRequest.Type)
            .Where(x => filterRequest.SearchTerm == null || x.Title.Contains(filterRequest.SearchTerm) || x.Decription.Contains(filterRequest.SearchTerm))
            .AsNoTracking()
            .ToListAsync();
}