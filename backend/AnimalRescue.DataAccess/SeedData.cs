using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.DataAccess;

public class SeedData
{
    private readonly AnimalRescueDbContext _dbContext;
    private ISecurityService _securityService;

    public SeedData(AnimalRescueDbContext dbContext, ISecurityService securityService)
    {
        _dbContext = dbContext;
        _securityService = securityService;
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
                        Username = $"user{nr}",
                        FirstName = "user",
                        LastName = $"{nr}",
                        Email = $"user{nr}@email.com",
                        Id = Guid.NewGuid(),
                        Password = _securityService.HashPassword($"user{nr}"),
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