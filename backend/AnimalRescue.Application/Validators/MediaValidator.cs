using AnimalRescue.Domain.Exceptions;
using Microsoft.AspNetCore.Http;

namespace AnimalRescue.Application.Validators
{
    public class MediaValidator
    {
        private static readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".webp", ".webm", ".mp4", ".mov", ".m4v" };
        // 10 mb max size
        private static long _maxFileSize = 10 * 1024 * 1024;

        public static void ValidateMedia(IFormFile file)
        {
            ValidateFileExtension(Path.GetExtension(file.FileName));
            ValidateFileSize(file.Length);
        }
        private static void ValidateFileExtension(string extension)
        {
            if (!_allowedExtensions.Contains(extension.ToLower()))
            {
                throw new ValidationException("This file extension is not allowed!");
            }
        }

        private static void ValidateFileSize(long fileSize)
        {
            if (fileSize > _maxFileSize)
            {
                throw new ValidationException($"Maximum allowed file size is {_maxFileSize} bytes.");
            }
        }
    }
}
