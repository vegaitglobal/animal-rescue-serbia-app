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

    public virtual DbSet<LiteViolation> LiteViolations { get; set; } = null!;

    public virtual DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new ViolationCategoryEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new LiteViolationEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
    }
}