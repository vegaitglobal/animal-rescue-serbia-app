using AnimalRescue.Application.Extensions;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Options;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;
using AnimalRescue.HtmlTemplates;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Razor.Templating.Core;

namespace AnimalRescue.Application.Services;

public class ViolationService : IViolationService
{
    private readonly IViolationCategoryRepository _violationCategoryRepository;
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IViolationRepository _violationRepository;
    private readonly IMediaContentService _mediaContentService;
    private readonly IMailingServiceClient _mailingServiceClient;
    private readonly ViolationSubmittedNotificationOptions _notificationOptions;
    private readonly ILogger<ViolationService> _logger;

    public ViolationService(
        IViolationCategoryRepository violationCategoryRepository,
        IUserService userService,
        IUserRepository userRepository,
        IViolationRepository violationRepository,
        IMediaContentService mediaContentService,
        IMailingServiceClient mailingServiceClient,
        IOptions<ViolationSubmittedNotificationOptions> notificationOptions,
        ILogger<ViolationService> logger)
    {
        _violationCategoryRepository = violationCategoryRepository;
        _userService = userService;
        _userRepository = userRepository;
        _violationRepository = violationRepository;
        _mediaContentService = mediaContentService;
        _mailingServiceClient = mailingServiceClient;
        _notificationOptions = notificationOptions.Value;
        _logger = logger;
    }

    public async Task<ViolationDto> AddAsync(ViolationCreateDto violationDto)
    {
        var category = await _violationCategoryRepository.GetAsync(violationDto.ViolationCategoryId);
        var currentUser = await _userService.GetCurrentUserAsync();

        if (category is null || currentUser is null)
        {
            throw new ValidationException("Bad request");
        }

        var user = await _userRepository.GetByEmailAsync(currentUser.Email);

        var fileUploadTasks = violationDto.Files?.Select(f => _mediaContentService.UploadMediaContentAsync(f));
        var mediaContent = Array.Empty<MediaContent>();
        if (fileUploadTasks is not null)
        {
            mediaContent = await Task.WhenAll(fileUploadTasks);
        }

        var violationToCreate = new Violation
        {
            Id = Guid.NewGuid(),
            Location = violationDto.Location,
            User = user!,
            ViolationCategory = category,
            Address = violationDto.Address,
            FullName = violationDto.FullName,
            PhoneNumber = violationDto.PhoneNumber,
            Description = violationDto.Description,
            MediaContent = mediaContent,
            Status = ViolationStatus.Pending,
            AdminNotes = null,
        };

        var created = await _violationRepository.AddAsync(violationToCreate);

        await SendEmailAsync(violationToCreate.Id);

        return created.ToDto();
    }

    public async Task<IEnumerable<ViolationDto>> GetAllApprovedAsync()
    {
        var violations = await _violationRepository.GetAllApprovedAsync();

        return violations.Select(violation => violation.ToDto());
    }

    public async Task<IEnumerable<AdminViolationDto>> GetAllAsync()
    {
        var violations = await _violationRepository.GetAllAsync();

        return violations.Select(violation => violation.ToAdminDto());
    }

    public async Task<PaginatedResponse<AdminViolationDto>> GetAllPaginatedAsync(ViolationFilterRequest violationFilterRequest, PaginationParameters paginationParameters)
    {
        var paginatedResponse = await _violationRepository.GetAllPaginatedAsync(violationFilterRequest, paginationParameters);

        return new PaginatedResponse<AdminViolationDto>()
        {
            PageNumber = paginatedResponse.PageNumber,
            FilteredCount = paginatedResponse.FilteredCount,
            Entities = paginatedResponse.Entities.Select(entity => entity.ToAdminDto())
        };
    }

    public async Task<ViolationDto?> GetAsync(Guid id)
    {
        var entity = await _violationRepository.GetAsync(id);

        return entity?.ToDto();
    }

    public async Task<ViolationDto?> GetApprovedAsync(Guid id)
    {
        var entity = await _violationRepository.GetApprovedAsync(id);

        return entity?.ToDto();
    }


    public async Task<AdminViolationDto?> GetForAdminAsync(Guid id)
    {
        var entity = await _violationRepository.GetAsync(id);

        return entity?.ToAdminDto();
    }

    public async Task<AdminViolationDto> UpdateAsync(Guid id, AdminViolationUpdateDto updateDto)
    {
        var existing = await _violationRepository.GetAsync(id);
        if (existing is null)
        {
            throw new EntityNotFoundException($"Violation with id: '{id}' does not exist!");
        }

        existing.AdminNotes = updateDto.AdminNotes;
        existing.Status = updateDto.Status;
        existing.Description = updateDto.Description;

        var updated = await _violationRepository.UpdateAsync(existing);

        return updated.ToAdminDto();
    }

    private async Task SendEmailAsync(Guid id)
    {
        var urlToForwardTo = string.Format(_notificationOptions.UrlTemplate, id);
        var htmlMessageBody = await GenerateHtmlMessageBody(urlToForwardTo);
        var emailRequest = new EmailRequestDto
        {
            Subject = _notificationOptions.Subject,
            Recipients = _notificationOptions.Recipients,
            Body = htmlMessageBody,
        };

        try
        {
            await _mailingServiceClient.SendEmailAsync(emailRequest);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occured while sending email notification for submitted violation");
        }
    }

    private static Task<string> GenerateHtmlMessageBody(string url)
    {
        var templateModel = new ViolationSubmittedTemplateModel
        {
            Url = url,
        };

        return RazorTemplateEngine.RenderAsync("/ViolationSubmittedTemplate.cshtml", templateModel);
    }
}