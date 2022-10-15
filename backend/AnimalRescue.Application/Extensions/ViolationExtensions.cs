using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class ViolationExtensions
{
    public static ViolationDto ToDto(this Violation violation)
        => new()
        {
            Id = violation.Id,
            ViolationCategory = violation.ViolationCategory.ToDto(),
            Location = violation.Location,
            Address = violation.Address,
            FullName = violation.FullName,
            PhoneNumber = violation.PhoneNumber,
        };
}