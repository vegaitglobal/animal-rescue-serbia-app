﻿using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Extensions;

public static class UserExtensions
{
    public static UserDto ToDto(this User user)
        => new()
        {
            Id = user.Id,
            Email = user.Email,
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            IsActive = user.IsActive,
            Role = user.Role
        };
}