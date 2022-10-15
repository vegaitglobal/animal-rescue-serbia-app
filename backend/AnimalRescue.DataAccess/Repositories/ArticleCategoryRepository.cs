using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess.Repositories
{
    public class ArticleCategoryRepository : IArticleCategoryRepository
    {
        private readonly AnimalRescueDbContext _dbContext;

        public ArticleCategoryRepository(AnimalRescueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ArticleCategory> AddAsync(ArticleCategory articleCategory)
        {
            var created = await _dbContext.AddAsync(articleCategory);

            await _dbContext.SaveChangesAsync();
            return created.Entity;
        }

        public async Task<IEnumerable<ArticleCategory>> GetAllAsync()
            => await _dbContext
                .ArticleCategories
                .AsNoTracking()
                .ToListAsync();

        public async Task<IEnumerable<ArticleCategory>> GetAllEnabledAsync()
            => await _dbContext
                .ArticleCategories
                .Where(category => category.IsEnabled)
                .AsNoTracking()
                .ToListAsync();

        public async Task<ArticleCategory?> GetAsync(Guid id)
            => await _dbContext
                .ArticleCategories
                .AsNoTracking()
                .FirstOrDefaultAsync(entity => entity.Id == id);

        public async Task<ArticleCategory> UpdateAsync(ArticleCategory articleCategory)
        {
            var updated = _dbContext.ArticleCategories.Update(articleCategory);

            await _dbContext.SaveChangesAsync();

            return updated.Entity;
        }
    }
}
