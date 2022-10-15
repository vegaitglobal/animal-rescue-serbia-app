using AnimalRescue.Domain.Models;

namespace AnimalRescue.DataAccess;

public class SeedData
{
    private readonly AnimalRescueDbContext _dbContext;

    public SeedData(AnimalRescueDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedTestData()
    {
        if (!_dbContext.Users.Any())
        {
            var entries = Enumerable
                .Range(0, 5)
                .Select(nr =>
                    new User
                    {
                        FullName = $"user{nr}",
                        Email = $"user{nr}@email.com",
                        Id = Guid.NewGuid(),
                        Password = $"user{nr}",
                    });

            _dbContext.Users.AddRange(entries);
            _dbContext.SaveChanges();
        }

        if (!_dbContext.ViolationCategories.Any())
        {
            var entries = Enumerable
                .Range(0, 5)
                .Select(nr =>
                    new ViolationCategory
                    {
                        Id = Guid.NewGuid(),
                        IsEnabled = true,
                        Name = $"Violation category {nr}",
                    });

            _dbContext.ViolationCategories.AddRange(entries);
            _dbContext.SaveChanges();
        }

        if (!_dbContext.ArticleCategories.Any())
        {
            var entries = Enumerable
                .Range(0, 5)
                .Select(nr =>
                    new ArticleCategory
                    {
                        Id = Guid.NewGuid(),
                        IsEnabled = true,
                        Name = $"Article category {nr}",
                    });

            _dbContext.ArticleCategories.AddRange(entries);
            _dbContext.SaveChanges();
        }
    }
}