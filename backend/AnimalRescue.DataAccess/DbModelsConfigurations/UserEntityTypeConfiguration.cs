using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> entity)
    {
        entity.HasKey(u => u.Id);

        entity.Property(u => u.Email).IsRequired();
        entity.HasIndex(u => u.Email).IsUnique();

        entity.Property(u => u.Username).IsRequired();
        entity.HasIndex(u => u.Username).IsUnique();
    }
}