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
        if (_dbContext.Users.FirstOrDefault(u => u.Email == "superadmin@test.com") == null)
        {
            _dbContext.Users.Add(new User
            {
                Username = "superadmin",
                FirstName = "super",
                LastName = "admin",
                Email = "superadmin@test.com",
                Id = Guid.NewGuid(),
                Password = _securityService.HashPassword("superadmin"),
                Role = UserRoles.Admin,
            });
            _dbContext.SaveChanges();
        }
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
                        Email = $"user{nr}@test.com",
                        Id = Guid.NewGuid(),
                        Password = _securityService.HashPassword($"user{nr}"),
                        Role = UserRoles.User,
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
            var user = _dbContext.Users.First();

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
    }
}