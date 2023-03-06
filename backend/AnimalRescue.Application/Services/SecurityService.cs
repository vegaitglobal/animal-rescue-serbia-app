using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnimalRescue.Application.Services;

public class SecurityService : ISecurityService
{
    private readonly IUserRepository _userRepository;
    private readonly SymmetricSecurityKey _key;
    private readonly byte[] _salt;

    public SecurityService(IConfiguration configuration, IUserRepository userRepository)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration[AppSettingKeys.JwtAuthenticationKey]));
        _salt = Encoding.UTF8.GetBytes(configuration[AppSettingKeys.JwtAuthenticationSalt]);
        _userRepository = userRepository;
    }

    public async Task<string> CreateToken(string userEmail)
    {
        var user = await _userRepository.GetByEmailAsync(userEmail);
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Email, userEmail),
            new (ClaimTypes.Name, user!.FirstName),
            new (ClaimTypes.Surname, user.LastName),
        };
        claims.AddRange(GetRoles(user.Role));

        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(30),
            SigningCredentials = credentials,
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    public string HashPassword(string password)
        => Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: _salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8)
        );

    private IEnumerable<Claim> GetRoles(UserRoles userRole)
    {
        var roles = new List<Claim>
        {
            new(ClaimTypes.Role, Roles.UserRole),
        };

        if (userRole is UserRoles.Moderator)
        {
            roles.Add(new(ClaimTypes.Role, Roles.ModeratorRole));
        }

        if (userRole is UserRoles.Admin)
        {
            roles.Add(new(ClaimTypes.Role, Roles.ModeratorRole));
            roles.Add(new(ClaimTypes.Role, Roles.AdminRole));
        }

        return roles;
    }
}
