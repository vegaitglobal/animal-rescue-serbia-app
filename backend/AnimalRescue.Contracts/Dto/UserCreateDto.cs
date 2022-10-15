namespace AnimalRescue.Contracts.Dto;

public class UserCreateDto
{
    public string FullName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string PasswordConfirm { get; set; }
}