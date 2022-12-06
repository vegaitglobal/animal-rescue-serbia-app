using AnimalRescue.Domain.Models;

namespace AnimalRescue.Contracts.Dto;

public class UserDto
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public bool IsActive{ get; set; }

    public UserRoles Role { get; set; } 

}