using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class ArticleEntityTypeConfiguration : IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> entity)
    {
        entity
            .HasOne<ArticleMediaContent>(x => x.MediaContent)
            .WithOne()
            .IsRequired(false)
            .HasForeignKey<ArticleMediaContent>(x => x.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}