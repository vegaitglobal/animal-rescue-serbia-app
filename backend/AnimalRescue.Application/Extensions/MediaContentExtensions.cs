using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class MediaContentExtensions
{
    public static MediaContentDto ToDto(this MediaContent mediaContent)
        => new()
        {
            FileName = mediaContent.FileName,
            FilePath = mediaContent.FilePath,
            Id = mediaContent.Id,
        };
}