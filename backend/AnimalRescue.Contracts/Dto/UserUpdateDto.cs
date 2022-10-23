using AnimalRescue.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Dto
{
    public class UserUpdateDto
    {
        [Required(AllowEmptyStrings = false)]
        public string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Username { get; set; }

        [Required(AllowEmptyStrings = false)]
        public UserRoles Role { get; set; } = UserRoles.User;

        [Required]
        public bool IsActive { get; set; }
    }
}
