using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Application.Validators
{
    public class UserValidator
    {
        private readonly IUserRepository _userRepository;

        public UserValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task ValidateUser(UserCreateDto user)
        {
            await ValidateUserEmail(user.Email);
            await ValidateUserUsername(user.Username);
            ValidatePasswordMatch(user.Password,user.PasswordConfirm);
            
        }
        private async Task ValidateUserEmail(string email)
        {
            var userByEmail = await _userRepository.GetByEmailAsync(email);

            if (userByEmail is not null)
            {
                throw new ValidationException($"User with email: {email} already exists");
            }
        }
        private async Task ValidateUserUsername(string username)
        {
            var userByUsername = await _userRepository.GetByUsernameAsync(username);

            if (userByUsername is not null)
            {
                throw new ValidationException($"User with username: {username} already exists");
            }
        }

        private void ValidatePasswordMatch(string password, string passwordConfirm)
        {
            if (password != passwordConfirm)
            {
                throw new ValidationException("Passwords do not match!");
            }
        }
    }
}
