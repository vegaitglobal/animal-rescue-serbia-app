namespace AnimalRescue.Contracts.Abstractions.Services;

public interface ISecurityService
{
    Task<string> CreateToken(string userEmail);

    string HashPassword(string password);
}