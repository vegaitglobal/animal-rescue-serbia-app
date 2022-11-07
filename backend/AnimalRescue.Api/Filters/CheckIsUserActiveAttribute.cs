using AnimalRescue.Contracts.Abstractions.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AnimalRescue.Api.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class CheckIsUserActiveAttribute : Attribute, IAsyncResourceFilter
{
    public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
    {
        ArgumentNullException.ThrowIfNull(context, nameof(context));
        ArgumentNullException.ThrowIfNull(next, nameof(next));

        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
        var isPublicEndpoint = context.ActionDescriptor.EndpointMetadata.Any(em => em is AllowAnonymousAttribute);

        if (!isPublicEndpoint)
        {
            var user = await userService.GetCurrentUserAsync();
            if (user?.IsActive != true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }

        await next();
    }
}