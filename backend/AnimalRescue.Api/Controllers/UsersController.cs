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

        public UsersController(ISecurityService securityService, IUserService userService)
        {
            _securityService = securityService;
            _userService = userService;
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

            var accessToken = await _securityService.CreateToken(loginModel.Email);

            var dto = new LoggedInUserDto
            {
                Email = loginModel.Email,
                AccessToken = accessToken,
            };

            return Ok(dto);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<LoggedInUserDto>> Register([FromBody] UserCreateDto createDto)
        {
            var created = await _userService.AddAsync(createDto);
            var accessToken = await _securityService.CreateToken(created.Email);

            var dto = new LoggedInUserDto
            {
                Email = created.Email,
                AccessToken = accessToken,
            };

            return Ok(dto);
        }
    }
}
