using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AnimalRescue.Application.Services;

public class MailingServiceClient : IMailingServiceClient
{
    private readonly EmailOptions _emailOptions;

    public MailingServiceClient(IOptions<EmailOptions> emailOptions)
    {
        _emailOptions = emailOptions.Value;
    }

    public async Task SendEmailAsync(EmailRequestDto emailRequest)
    {
        var email = new MimeMessage();
        email.Subject = emailRequest.Subject;
        email.Sender = MailboxAddress.Parse(_emailOptions.Mail);
        email.To.AddRange(emailRequest.Recipients.Select(MailboxAddress.Parse));
        email.Body = GetMessageBodyAsMimeEntity(emailRequest.Body);

        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(_emailOptions.Host, _emailOptions.Port, SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(_emailOptions.Mail, _emailOptions.Password);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

    private static MimeEntity GetMessageBodyAsMimeEntity(string body)
        => new BodyBuilder { HtmlBody = body }.ToMessageBody();
}