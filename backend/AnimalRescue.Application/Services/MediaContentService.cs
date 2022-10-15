using AnimalRescue.Application.Constants;
using AnimalRescue.Application.Validators;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace AnimalRescue.Application.Services
{
    public class MediaContentService : IMediaContentService
    {
        private readonly IMediaContentRepository _mediaContentRepository;
        private readonly IConfiguration _configuration;

        public MediaContentService(IMediaContentRepository mediaContentRepository,IConfiguration configuration)
        {
            _mediaContentRepository = mediaContentRepository;
            _configuration = configuration;
        }
        public async Task<MediaContent> UploadMediaContentAsync(IFormFile fileToUpload)
        {
            MediaValidator.ValidateMedia(fileToUpload);

            return await _mediaContentRepository.UploadMediaContentAsync(_configuration.GetSection(AppSettingKeys.MediaRoothPath).Value, fileToUpload);
        }
    }
}
