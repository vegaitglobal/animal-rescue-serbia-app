using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class ViolationMediaContentEntityTypeConfiguration : IEntityTypeConfiguration<ViolationMediaContent>
{
    public void Configure(EntityTypeBuilder<ViolationMediaContent> entity)
    {

    }
}