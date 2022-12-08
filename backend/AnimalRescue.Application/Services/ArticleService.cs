using AnimalRescue.Application.Extensions;
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

        ArticleMediaContent media = null;
        if (createDto.File is not null)
        {
            media = await _mediaContentService.UploadArticleMediaContentAsync(createDto.File);
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

    public async Task<ArticleDto> PatchAsync(Guid id, ArticleUpdateDto article)
    {
        var existing = await _articleRepository.GetAsync(id);
        if (existing is null)
        {
            throw new EntityNotFoundException($"Article with id: '{id}' does not exist!");
        }

        if (!string.IsNullOrWhiteSpace(article.Title))
        {
            existing.Title = article.Title;
        }

        if (article.Decription is not null)
        {
            existing.Decription = article.Decription;
        }

        if (article.Type.HasValue)
        {
            existing.Type = article.Type.Value;
        }

        if (article.CategoryId.HasValue)
        {
            var category = await _articleCategoryRepository.GetAsync(article.CategoryId.Value);
            if (category is null)
            {
                throw new ValidationException("Chosen category does not exist.");
            }

            existing.Category = category;
        }

        if (article.File is not null)
        {
            var media = await _mediaContentService.UploadArticleMediaContentAsync(article.File);

            existing.MediaContent = media;
        }

        var updated = await _articleRepository.UpdateAsync(existing);

        return updated.ToDto();
    }
}