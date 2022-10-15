using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class LiteViolationEntityTypeConfiguration : IEntityTypeConfiguration<LiteViolation>
{
    public void Configure(EntityTypeBuilder<LiteViolation> entity)
    {
        entity.HasKey(e => e.Id);

        entity.HasOne(e => e.User).WithMany();
    }
}