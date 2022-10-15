using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.DataAccess.Repositories
{
    public class MediaContentRepository : IMediaContentRepository
    {
        public async Task<MediaContent> UploadMediaContentAsync(string rootFilePath, IFormFile fileToUpload)
        {
            var fileId = Guid.NewGuid();
            var fileName = Path.GetFileName(fileToUpload.FileName);
            var extension = Path.GetExtension(fileToUpload.FileName);

            var fullPath = $"{rootFilePath}\\{fileId}{extension}";

            using (var stream = System.IO.File.Create(fullPath))
            {
                await fileToUpload.CopyToAsync(stream);
            }

            return new MediaContent()
            {
                Id = fileId,
                FileName = fileName,
                FilePath = fullPath
            };
        }
    }
}
