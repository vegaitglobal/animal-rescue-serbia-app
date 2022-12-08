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

        public async Task<ArticleMediaContent> UploadArticleMediaContentAsync(IFormFile fileToUpload)
        {
            // TODO allow only images
            MediaValidator.ValidateMedia(fileToUpload);
            var media = await _mediaContentRepository.UploadMediaContentAsync(fileToUpload);

            return new ArticleMediaContent
            {
                Id = media.Id,
                FileName = media.FileName,
                ContentType = media.ContentType,
                FilePath = media.FilePath,
                RelativePath = media.RelativePath,
            };
        }

        public async Task<ViolationMediaContent> UploadViolationMediaContentAsync(IFormFile fileToUpload)
        {
            MediaValidator.ValidateMedia(fileToUpload);
            var media = await _mediaContentRepository.UploadMediaContentAsync(fileToUpload);

            return new ViolationMediaContent
            {
                Id = media.Id,
                FileName = media.FileName,
                ContentType = media.ContentType,
                FilePath = media.FilePath,
                RelativePath = media.RelativePath,
            };
        }
    }
}
