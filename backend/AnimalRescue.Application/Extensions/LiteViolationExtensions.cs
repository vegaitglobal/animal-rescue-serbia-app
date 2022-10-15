using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class LiteViolationExtensions
{
    public static LiteViolationDto ToDto(this LiteViolation liteViolation)
        => new()
        {
            Id = liteViolation.Id,
            ViolationCategory = liteViolation.ViolationCategory.ToDto(),
            Location = liteViolation.Location,
        };
}