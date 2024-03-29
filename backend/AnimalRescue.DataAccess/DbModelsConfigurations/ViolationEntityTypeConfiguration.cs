﻿using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class ViolationEntityTypeConfiguration : IEntityTypeConfiguration<Violation>
{
    public void Configure(EntityTypeBuilder<Violation> entity)
    {
        entity
            .HasMany<ViolationMediaContent>(x => x.MediaContent)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction);
    }
}