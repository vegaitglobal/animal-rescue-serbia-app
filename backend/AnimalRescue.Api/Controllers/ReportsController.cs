using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportsService _reportsService;

        public ReportsController(IReportsService reportsService)
        {
            _reportsService = reportsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IDictionary<string, IEnumerable<ViolationReportDto>>>> GetReportsAsync()
        {
            var reports = await _reportsService.GetReportsAsync();

            return Ok(reports);
        }
    }
}
