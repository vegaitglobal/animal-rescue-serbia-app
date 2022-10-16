using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.FilterRequests;

public class ArticleFilterRequest
{
    public string? SearchTerm { get; set; }

    public ArticleType? Type { get; set; }
}