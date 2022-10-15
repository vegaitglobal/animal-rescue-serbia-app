using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Abstractions.Repositories
{
    public interface IMediaContentRepository
    {
        Task<MediaContent> UploadMediaContentAsync(string rootFilePath, IFormFile fileToUpload);
    }
}
