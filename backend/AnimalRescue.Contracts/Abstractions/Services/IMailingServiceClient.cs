using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IMailingServiceClient
{
    Task SendEmailAsync(EmailRequestDto emailRequest);
}