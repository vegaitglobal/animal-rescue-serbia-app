using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using AnimalRescue.Application.Constants;
using AnimalRescue.Domain.Exceptions;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AnimalRescue.Api.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration[AppSettingKeys.JwtAuthenticationKey]));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };
            });

        return services;
    }

    public static IServiceCollection AddProblemDetails(this IServiceCollection serviceCollection, IHostEnvironment environment)
    {
        serviceCollection
            .AddProblemDetails(configuration =>
            {
                configuration.IncludeExceptionDetails = (_, __) => environment.IsDevelopment();
                AddMappings<ValidationException>(configuration, StatusCodes.Status400BadRequest);
                AddMappings<ArgumentNullException>(configuration, StatusCodes.Status400BadRequest);
                AddMappings<EntityNotFoundException>(configuration, StatusCodes.Status404NotFound);
            });

        return serviceCollection;
    }

    private static void AddMappings<T>(ProblemDetailsOptions configuration, int statusCode)
        where T : Exception
    {
        configuration.Map<T>(exception => new ProblemDetails
        {
            Status = statusCode,
            Title = exception.Message,
        });
    }
}
