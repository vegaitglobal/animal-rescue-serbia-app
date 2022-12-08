using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Contracts.Abstractions.Services
{
    public interface IMediaContentService
    {
        Task<ViolationMediaContent> UploadViolationMediaContentAsync(IFormFile fileToUpload);

        Task<ArticleMediaContent> UploadArticleMediaContentAsync(IFormFile fileToUpload);
    }
}
