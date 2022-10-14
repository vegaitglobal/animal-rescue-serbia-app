using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet("secured")]
    [Authorize]
    public IEnumerable<int> GetSecured() => Enumerable.Range(1, 5);

    [HttpGet]
    public IEnumerable<int> Get() => Enumerable.Range(1, 5);
}