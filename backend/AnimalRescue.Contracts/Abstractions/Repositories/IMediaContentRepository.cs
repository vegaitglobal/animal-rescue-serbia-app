using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Contracts.Abstractions.Repositories
{
    public interface IMediaContentRepository
    {
        Task<MediaContent> UploadMediaContentAsync(IFormFile fileToUpload);
    }
}
