using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class ViolationCategoryEntityTypeConfiguration : IEntityTypeConfiguration<ViolationCategory>
{
    public void Configure(EntityTypeBuilder<ViolationCategory> entity)
    {
        entity.HasKey(e => e.Id);

        entity.Property(e => e.Name).IsRequired();
        entity.HasIndex(e => e.Name).IsUnique();
    }
}