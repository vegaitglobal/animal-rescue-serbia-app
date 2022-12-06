using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.DataAccess;

public class SeedData
{
    private readonly AnimalRescueDbContext _dbContext;
    private readonly ISecurityService _securityService;

    public SeedData(AnimalRescueDbContext dbContext, ISecurityService securityService)
    {
        _dbContext = dbContext;
        _securityService = securityService;
    }

    public void SeedSuperUser()
    {
        // MOVE THIS TO APP SETTINGS
        if (_dbContext.Users.All(u => u.Role != UserRoles.Admin))
        {
            _dbContext.Users.Add(new User
            {
                Username = "admin",
                FirstName = "Admin first name",
                LastName = "Admin lastname",
                Email = "admin@ars.com",
                Id = Guid.NewGuid(),
                Password = _securityService.HashPassword("admin@ars.com"),
                Role = UserRoles.Admin,
            });
            _dbContext.SaveChanges();
        }
    }

    public void SeedTestData()
    {
        if (_dbContext.Users.All(u => u.Role != UserRoles.User))
        {
            var entries = Enumerable
                .Range(0, 5)
                .Select(nr =>
                    new User
                    {
                        Username = $"user{nr}",
                        FirstName = $"User name {nr}",
                        LastName = $"User lastname {nr}",
                        Email = $"user{nr}@ars.com",
                        Id = Guid.NewGuid(),
                        Password = _securityService.HashPassword($"user{nr}@ars.com"),
                        Role = UserRoles.User,
                    });

            _dbContext.Users.AddRange(entries);
            _dbContext.SaveChanges();
        }

        if (_dbContext.Users.All(u => u.Role != UserRoles.Moderator))
        {
            var entries = Enumerable
                .Range(0, 5)
                .Select(nr =>
                    new User
                    {
                        Username = $"moderator{nr}",
                        FirstName = $"Moderator name {nr}",
                        LastName = $"Moderator lastname {nr}",
                        Email = $"moderator{nr}@ars.com",
                        Id = Guid.NewGuid(),
                        Password = _securityService.HashPassword($"moderator{nr}@ars.com"),
                        Role = UserRoles.Moderator,
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

        if (!_dbContext.Violations.Any())
        {
            var user = _dbContext.Users.First(u => u.Role == UserRoles.User);

            var categories = _dbContext
                .ViolationCategories
                .Take(5);

            foreach (var category in categories)
            {
                for (int i = 0; i < 5; i++)
                {
                    var violation1 = new Violation
                    {
                        Id = Guid.NewGuid(),
                        Address = "Address",
                        FullName = "Some name",
                        User = user,
                        ViolationCategory = category,
                        Status = ViolationStatus.Pending,
                        Location = "Kragujevac",
                        PhoneNumber = "1312",
                        Description = "Description",
                    };

                    var violation2 = new Violation
                    {
                        Id = Guid.NewGuid(),
                        Address = "Address",
                        FullName = "Some name",
                        User = user,
                        ViolationCategory = category,
                        Status = ViolationStatus.Pending,
                        Location = "Stapar",
                        PhoneNumber = "1312",
                        Description = "Description",
                    };

                    var violation3 = new Violation
                    {
                        Id = Guid.NewGuid(),
                        Address = "Address",
                        FullName = "Some name",
                        User = user,
                        ViolationCategory = category,
                        Status = ViolationStatus.Pending,
                        Location = "Beograd",
                        PhoneNumber = "1312",
                        Description = "Description",
                    };

                    _dbContext.Violations.AddRange(violation1, violation2, violation3);
                }
            }

            _dbContext.SaveChanges();
        }

        if (!_dbContext.Articles.Any())
        {
            var user = _dbContext.Users.First();

            var categories = _dbContext
                .ArticleCategories
                .Take(5);

            foreach (var category in categories)
            {
                for (int i = 0; i < 5; i++)
                {
                    var article = new Article
                    {
                        Id = Guid.NewGuid(),
                        User = user,
                        Category = category,
                        Decription = "article description",
                        Title = "Title of article",
                        Type = ArticleType.Article,
                    };

                    var page = new Article
                    {
                        Id = Guid.NewGuid(),
                        User = user,
                        Category = category,
                        Decription = "page description",
                        Title = "Title of page",
                        Type = ArticleType.Page,
                    };

                    _dbContext.Articles.AddRange(article, page);
                }
            }

            _dbContext.SaveChanges();
        }
    }
}