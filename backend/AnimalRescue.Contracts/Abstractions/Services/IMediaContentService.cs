using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Contracts.Abstractions.Services
{
    public interface IMediaContentService
    {
        Task<MediaContent> UploadMediaContentAsync(IFormFile fileToUpload);
    }
}
