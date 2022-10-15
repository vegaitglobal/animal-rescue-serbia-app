using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnimalRescue.Application.Services;

public class SecurityService : ISecurityService
{
    private readonly SymmetricSecurityKey _key;
    private readonly byte[] _salt;

    public SecurityService(IConfiguration configuration)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration[AppSettingKeys.JwtAuthenticationKey]));
        _salt = Encoding.UTF8.GetBytes(configuration[AppSettingKeys.JwtAuthenticationSalt]);
    }

    public string CreateToken(string userEmail)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Email, userEmail),
        };

        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
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
}
