namespace AnimalRescue.Domain.Models;

public class Article
{
    public Guid Id { get; set; }

    public string Title { get; set; }

    public string Decription { get; set; }

    public ArticleType Type { get; set; }

    public virtual ArticleCategory Category { get; set; }

    public virtual User User { get; set; }

    public virtual MediaContent? MediaContent { get; set; }
}