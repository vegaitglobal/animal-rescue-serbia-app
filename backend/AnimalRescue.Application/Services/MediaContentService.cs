using AnimalRescue.Application.Validators;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Application.Services
{
    public class MediaContentService : IMediaContentService
    {
        private readonly IMediaContentRepository _mediaContentRepository;

        public MediaContentService(IMediaContentRepository mediaContentRepository)
        {
            _mediaContentRepository = mediaContentRepository;
        }

        public async Task<MediaContent> UploadMediaContentAsync(IFormFile fileToUpload)
        {
            MediaValidator.ValidateMedia(fileToUpload);
            return await _mediaContentRepository.UploadMediaContentAsync(fileToUpload);
        }
    }
}
