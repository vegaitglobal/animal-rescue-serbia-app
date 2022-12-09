using AnimalRescue.Api.Extensions;
using AnimalRescue.Api.Filters;
using AnimalRescue.Application.Constants;
using AnimalRescue.Application.Extensions;
using AnimalRescue.DataAccess;
using Hellang.Middleware.ProblemDetails;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

namespace AnimalRescue.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        ConfigureServices(builder.Services, builder.Configuration, builder.Environment);

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AnimalRescueDbContext>();
            db.Database.Migrate();
        }

        Configure(app, app.Environment);

        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration, IHostEnvironment webHostEnvironment)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                if (webHostEnvironment.IsDevelopment())
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                }
                else
                {
                    builder.WithOrigins(configuration.GetSection(AppSettingKeys.CorsOrigins).Get<string[]>())
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            });
        });

        services.AddAuthorization();
        services.AddJwtAuthentication(configuration);
        services.AddHttpContextAccessor();
        services.AddServices(configuration);

        services.AddProblemDetails(webHostEnvironment);
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(config =>
        {
            config.EnableAnnotations();
            config.SwaggerDoc("v1", new OpenApiInfo { Title = "AnimalRescue.Api", Version = "v1" });
            config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "Bearer",
                BearerFormat = "JWT",
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

        services.AddControllers(options =>
            {
                options.Filters.Add(new CheckIsUserActiveAttribute());
            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(allowIntegerValues: false));
            });
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
            .UseCors();

        if (!env.IsDevelopment())
        {
            applicationBuilder.UseHttpsRedirection();
        }

        applicationBuilder
            .UseAuthentication()
            .UseAuthorization();

        if (env.IsDevelopment())
        {
            applicationBuilder.UseCookiePolicy(new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax,
            });

            try
            {
                using var scope = applicationBuilder.ApplicationServices.CreateScope();
                var dataSeeder = scope.ServiceProvider.GetRequiredService<SeedData>();
                dataSeeder.SeedTestData();
            }
            catch (Exception ex) { }
        }

        SeedSuperUser(applicationBuilder);

        applicationBuilder
            .UseProblemDetails()
            .UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
    }

    private static void SeedSuperUser(IApplicationBuilder applicationBuilder)
    {
        try
        {
            using var scope = applicationBuilder.ApplicationServices.CreateScope();
            var dataSeeder = scope.ServiceProvider.GetRequiredService<SeedData>();
            dataSeeder.SeedSuperUser();
        }
        catch (Exception ex) { }
    }
}