using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class ViolationCategoryExtensions
{
    public static ViolationCategoryDto ToDto(this ViolationCategory violationCategory)
        => new()
        {
            Id = violationCategory.Id,
            Name = violationCategory.Name,
            IsEnabled = violationCategory.IsEnabled,
        };
}