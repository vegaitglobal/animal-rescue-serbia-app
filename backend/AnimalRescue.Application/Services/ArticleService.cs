using AnimalRescue.Application.Extensions;
using AnimalRescue.Application.Validators;
using AnimalRescue.Contracts.Abstractions.Repositories;
using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;
using AnimalRescue.Contracts.FilterRequests;
using AnimalRescue.Contracts.Pagination;
using AnimalRescue.Domain.Exceptions;
using AnimalRescue.Domain.Models;

namespace AnimalRescue.Application.Services;

public class ArticleService : IArticleService
{
    private readonly IArticleRepository _articleRepository;
    private readonly IArticleCategoryRepository _articleCategoryRepository;
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IMediaContentService _mediaContentService;

    public ArticleService(
        IArticleRepository articleRepository,
        IArticleCategoryRepository articleCategoryRepository,
        IUserService userService,
        IUserRepository userRepository,
        IMediaContentService mediaContentService)
    {
        _articleRepository = articleRepository;
        _articleCategoryRepository = articleCategoryRepository;
        _userService = userService;
        _userRepository = userRepository;
        _mediaContentService = mediaContentService;
    }

    public async Task<ArticleDto> AddAsync(ArticleCreateDto createDto)
    {
        var category = await _articleCategoryRepository.GetAsync(createDto.CategoryId);
        var currentUser = await _userService.GetCurrentUserAsync();

        if (category is null || currentUser is null)
        {
            throw new ValidationException("Bad request");
        }

        var user = await _userRepository.GetByEmailAsync(currentUser!.Email);

        MediaContent media = null;
        if (createDto.File is not null)
        {
            MediaValidator.ValidateImage(createDto.File);
            media = await _mediaContentService.UploadMediaContentAsync(createDto.File);
        }

        var articleToCreate = new Article
        {
            Id = Guid.NewGuid(),
            User = user!,
            MediaContent = media,
            Category = category,
            Decription = createDto.Decription,
            Title = createDto.Title,
            Type = createDto.Type,
        };

        var created = await _articleRepository.AddAsync(articleToCreate);

        return created.ToDto();
    }

    public async Task<PaginatedResponse<ArticleDto>> GetAllPaginatedAsync(ArticleFilterRequest filterRequest, PaginationParameters paginationParameters)
    {
        var paginatedResponse = await _articleRepository.GetAllPaginatedAsync(filterRequest, paginationParameters);

        return new PaginatedResponse<ArticleDto>
        {
            PageNumber = paginatedResponse.PageNumber,
            FilteredCount = paginatedResponse.FilteredCount,
            Entities = paginatedResponse.Entities.Select(entity => entity.ToDto()),
        };
    }

    public async Task<ArticleDto?> GetAsync(Guid id)
    {
        var entity = await _articleRepository.GetAsync(id);

        return entity?.ToDto();
    }

    public async Task<ArticleDto> UpdateAsync(Guid id, ArticleUpdateDto article)
    {
        var existing = await _articleRepository.GetAsync(id);
        if (existing is null)
        {
            throw new EntityNotFoundException($"Article with id: '{id}' does not exist!");
        }

        existing.Decription = article.Decription;
        existing.Title = article.Title;
        existing.Type = article.Type;

        var updated = await _articleRepository.UpdateAsync(existing);

        return updated.ToDto();
    }
}