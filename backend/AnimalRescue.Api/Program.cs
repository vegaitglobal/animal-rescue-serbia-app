using AnimalRescue.Api.Extensions;
using AnimalRescue.Application.Constants;
using AnimalRescue.Application.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;

namespace AnimalRescue.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        ConfigureServices(builder.Services, builder.Configuration, builder.Environment);

        var app = builder.Build();

        Configure(app, app.Environment);

        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration, IHostEnvironment webHostEnvironment)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(configuration.GetSection(AppSettingKeys.CorsOrigins).Get<string[]>())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        services.AddAuthorization();
        services.AddJwtAuthentication(configuration);
        services.AddServices(configuration);

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(config =>
        {
            config.EnableAnnotations();
            config.SwaggerDoc("v1", new OpenApiInfo { Title = "AnimalRescue.Api", Version = "v1" });
            config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
            });
            config.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer",
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                }
            });
        });

        services.AddControllers();
    }

    private static void Configure(IApplicationBuilder applicationBuilder, IHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            applicationBuilder
                .UseSwagger()
                .UseSwaggerUI();
        }

        applicationBuilder
            .UseStaticFiles()
            .UseRouting()
            .UseCors()
            .UseHttpsRedirection()
            .UseAuthentication()
            .UseAuthorization();

        if (env.IsDevelopment())
        {
            applicationBuilder.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax,
            });
        }

        applicationBuilder
            .UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
    }
}