using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class UserExtensions
{
    public static UserDto ToDto(this User user)
        => new()
        {
            Id = user.Id,
            Email = user.Email,
            FullName = user.FullName,
        };
}