using AnimalRescue.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Abstractions.Repositories
{
    public interface IArticleCategoryRepository
    {
        Task<ArticleCategory?> GetAsync(Guid id);

        Task<IEnumerable<ArticleCategory>> GetAllAsync();

        Task<IEnumerable<ArticleCategory>> GetAllEnabledAsync();

        Task<ArticleCategory> AddAsync(ArticleCategory articleCategory);

        Task<ArticleCategory> UpdateAsync(ArticleCategory articleCategory);
    }
}
