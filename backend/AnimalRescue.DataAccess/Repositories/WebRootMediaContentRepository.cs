using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.DataAccess.Repositories
{
    public class WebRootMediaContentRepository : IMediaContentRepository
    {
        private readonly IWebHostEnvironment _environment;
        private const string UploadsFolderName = "uploads";

        public WebRootMediaContentRepository(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<MediaContent> UploadMediaContentAsync(IFormFile fileToUpload)
        {
            var rootFilePath = _environment.WebRootPath;

            var fileId = Guid.NewGuid();
            var fileName = Path.GetFileName(fileToUpload.FileName);
            var extension = Path.GetExtension(fileToUpload.FileName);

            var uploadDirectoryPath = $"{rootFilePath}\\{UploadsFolderName}";

            if (!Directory.Exists(uploadDirectoryPath))
            {
                Directory.CreateDirectory(uploadDirectoryPath);
            }

            var relativePath = $"{UploadsFolderName}\\{fileId}{extension}";
            var fullPath = $"{rootFilePath}\\{relativePath}";

            using (var stream = File.Create(fullPath))
            {
                await fileToUpload.CopyToAsync(stream);
            }

            return new MediaContent
            {
                Id = fileId,
                FileName = fileName,
                FilePath = fullPath,
                RelativePath = relativePath,
                ContentType = fileToUpload.ContentType,
            };
        }
    }
}
