using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Validators
{
    public class UserValidator
    {
        private readonly IUserRepository _userRepository;
        private readonly ISecurityService _securityService;

        public UserValidator(IUserRepository userRepository, ISecurityService securityService)
        {
            _userRepository = userRepository;
            _securityService = securityService;
        }
        public async Task ValidateUserCreate(UserCreateDto user)
        {
            await ValidateUserEmail(user.Email);
            await ValidateUserUsername(user.Username);
            ValidatePasswordMatch(user.Password, user.PasswordConfirm);
        }

        public async Task ValidateUserUpdate(User? userToUpdate, UserUpdateDto userUpdateDto, UserDto? currentUser)
        {
            if (userToUpdate is null)
            {
                throw new EntityNotFoundException("User you are trying to update does not exist!");
            }

            ValidateCurrentUser(currentUser, userToUpdate.Id);

            if (userToUpdate.Username != userUpdateDto.Username)
            {
                await ValidateUserUsername(userUpdateDto.Username);
            }
        }

        public async Task ValidateUserCredentialsUpdate(User? userToUpdate, UserCredentialsUpdateDto userUpdateDto, UserDto? currentUser)
        {
            if (userToUpdate is null)
            {
                throw new EntityNotFoundException("User you are trying to update does not exist!");
            }

            ValidateCurrentUser(currentUser, userToUpdate.Id);
            await ValidateOldPasssword(userToUpdate.Id, userUpdateDto.OldPassword);
            ValidatePasswordMatch(userUpdateDto.Password, userUpdateDto.PasswordConfirm);
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

        private void ValidateCurrentUser(UserDto? currentUser, Guid userId)
        {
            if (currentUser is null)
            {
                throw new EntityNotFoundException("User you are logged in with does not exist!");
            }

            if (currentUser.Id != userId)
            {
                throw new ValidationException("User you are trying to update is not same as user you are logged in with!");
            }
        }

        private void ValidatePasswordMatch(string password, string passwordConfirm)
        {
            if (password != passwordConfirm)
            {
                throw new ValidationException("Passwords do not match!");
            }
        }

        private async Task ValidateOldPasssword(Guid id, string currentPassword)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user?.Password != _securityService.HashPassword(currentPassword))
            {
                throw new ValidationException("Old password does not match!");
            }
        }
    }
}
