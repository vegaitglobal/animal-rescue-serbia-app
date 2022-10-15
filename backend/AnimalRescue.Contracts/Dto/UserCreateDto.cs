using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Dto;

public class UserCreateDto
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Username { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Email { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string Password { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string PasswordConfirm { get; set; }
}