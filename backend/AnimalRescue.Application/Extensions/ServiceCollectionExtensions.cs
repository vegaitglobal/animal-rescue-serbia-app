using AnimalRescue.Application.Constants;
using AnimalRescue.Application.Services;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Options;
using AnimalRescue.DataAccess;
using AnimalRescue.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AnimalRescue.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        var connectionString = Environment.GetEnvironmentVariable(AppSettingKeys.ConnectionString) ??
                               configuration.GetConnectionString(AppSettingKeys.ConnectionString);

        serviceCollection.AddDbContext<AnimalRescueDbContext>(
            options =>
            {
                options.UseSqlServer(connectionString);
            },
            ServiceLifetime.Scoped);

        serviceCollection.Configure<EmailOptions>(configuration.GetSection(AppSettingKeys.EmailOptions));
        serviceCollection.Configure<ViolationSubmittedNotificationOptions>(configuration.GetSection(AppSettingKeys.ViolationSubmittedNotificationOptions));

        serviceCollection
            .AddScoped<SeedData>()
            .AddTransient<IViolationCategoryRepository, ViolationCategoryRepository>()
            .AddTransient<IViolationCategoryService, ViolationCategoryService>()
            .AddTransient<ILiteViolationsRepository, LiteViolationsRepository>()
            .AddTransient<ILiteViolationService, LiteViolationService>()
            .AddTransient<ISecurityService, SecurityService>()
            .AddTransient<IUserRepository, UserRepository>()
            .AddTransient<IUserService, UserService>()
            .AddTransient<IViolationRepository, ViolationRepository>()
            .AddTransient<IViolationService, ViolationService>()
            .AddTransient<IMailingServiceClient, MailingServiceClient>()
            .AddTransient<IArticleCategoryRepository, ArticleCategoryRepository>()
            .AddTransient<IArticleCategoryService, ArticleCategoryService>()
            .AddTransient<IMediaContentRepository, MediaContentRepository>()
            .AddTransient<IMediaContentService, MediaContentService>();

        return serviceCollection;
    }
}