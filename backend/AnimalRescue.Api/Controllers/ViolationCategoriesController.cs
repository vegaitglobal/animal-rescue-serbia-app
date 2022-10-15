using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.UserRole)]
    public class ViolationCategoriesController : ControllerBase
    {
        private readonly IViolationCategoryService _violationCategoryService;

        public ViolationCategoriesController(IViolationCategoryService violationCategoryService)
        {
            _violationCategoryService = violationCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViolationCategoryDto>>> GetAllAsync()
        {
            var categories = await _violationCategoryService.GetAllEnabledAsync();

            return Ok(categories);
        }

    }
}
