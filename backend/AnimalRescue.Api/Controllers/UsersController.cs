using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ISecurityService _securityService;
        private readonly IUserService _userService;
        private IHttpContextAccessor _httpContextAccessor;


        public UsersController(ISecurityService securityService, IUserService userService, IHttpContextAccessor httpContextAccessor)
        {
            _securityService = securityService;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<LoggedInUserDto>> Login([FromBody] UserLoginDto loginModel)
        {
            var isValidUser = await _userService.ValidateUserCredentials(loginModel.Email, loginModel.Password);

            if (!isValidUser)
            {
                return Unauthorized();
            }

            var dto = new LoggedInUserDto
            {
                Email = loginModel.Email,
                AccessToken = _securityService.CreateToken(loginModel.Email),
            };

            return Ok(dto);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<LoggedInUserDto>> Register([FromBody] UserCreateDto createDto)
        {
            var created = await _userService.AddAsync(createDto);

            var dto = new LoggedInUserDto
            {
                Email = created.Email,
                AccessToken = _securityService.CreateToken(created.Email),
            };

            return Ok(dto);
        }
    }
}
