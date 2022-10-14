using AnimalRescue.Application.Constants;
using AnimalRescue.Application.Services;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
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
        serviceCollection.AddDbContext<AnimalRescueDbContext>(
            options =>
            {
                options.UseSqlServer(configuration.GetConnectionString(AppSettingKeys.ConnectionString));
            },
            ServiceLifetime.Scoped);

        serviceCollection.AddTransient<IViolationCategoryRepository, ViolationCategoryRepository>();
        serviceCollection.AddTransient<IViolationCategoryService, ViolationCategoryService>();

        return serviceCollection;
    }
}