using AnimalRescue.DataAccess.DbModelsConfigurations;
using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AnimalRescue.DataAccess;

public class AnimalRescueDbContext : DbContext
{
    public AnimalRescueDbContext(DbContextOptions<AnimalRescueDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ViolationCategory> ViolationCategories { get; set; } = null!;

    public virtual DbSet<ArticleCategory> ArticleCategories { get; set; } = null!;

    public virtual DbSet<Article> Articles { get; set; } = null!;

    public virtual DbSet<LiteViolation> LiteViolations { get; set; } = null!;

    public virtual DbSet<Violation> Violations { get; set; } = null!;

    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new ViolationCategoryEntityTypeConfiguration())
                    .ApplyConfiguration(new LiteViolationEntityTypeConfiguration())
                    .ApplyConfiguration(new ViolationEntityTypeConfiguration())
                    .ApplyConfiguration(new UserEntityTypeConfiguration())
                    .ApplyConfiguration(new ArticleCategoryEntityTypeConfiguration())
                    .ApplyConfiguration(new ArticleEntityTypeConfiguration())
                    .ApplyConfiguration(new ArticleMediaContentEntityTypeConfiguration())
                    .ApplyConfiguration(new ViolationMediaContentEntityTypeConfiguration());
    }
}