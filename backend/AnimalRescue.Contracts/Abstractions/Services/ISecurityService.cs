namespace AnimalRescue.Contracts.Abstractions.Services;

public interface ISecurityService
{
    string CreateToken(string userEmail);

    string HashPassword(string password);
}