using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Dto
{
    public class UserCredentialsUpdateDto
    {
        [Required(AllowEmptyStrings = false)]
        public string OldPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string PasswordConfirm { get; set; }
    }
}
