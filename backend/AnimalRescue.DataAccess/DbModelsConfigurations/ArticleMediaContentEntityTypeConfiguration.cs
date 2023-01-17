using AnimalRescue.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AnimalRescue.DataAccess.DbModelsConfigurations;

public class ArticleMediaContentEntityTypeConfiguration : IEntityTypeConfiguration<ArticleMediaContent>
{
    public void Configure(EntityTypeBuilder<ArticleMediaContent> entity)
    {

    }
}