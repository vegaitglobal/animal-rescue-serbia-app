using AnimalRescue.Application.Constants;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AnimalRescue.Api.Controllers.Admin
{
    [Route("api/admin/Users")]
    [ApiController]
    [Authorize(Roles = Roles.AdminRole)]
    public class UserAdminController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserAdminController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateAsync([FromBody] UserCreateDto createDto)
        {
            createDto.Role = UserRoles.Moderator;
            var created = await _userService.AddAsync(createDto);

            return CreatedAtRoute("AdminGetUserById", new { id = created.Id }, null);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> UpdateAsync(Guid id, UserAdminUpdateDto userUpdateDto)
        {
            var updated = await _userService.AdminUpdateAsync(id, userUpdateDto);

            return Ok(updated);
        }

        [HttpGet("{id}", Name = "AdminGetUserById")]
        public async Task<ActionResult<UserDto>> GetByIdAsync(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);

            return user is null
                ? NotFound()
                : Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllAsync()
        {
            var users = await _userService.GetAllAsync();

            return Ok(users);
        }

    }
}
