using AnimalRescue.Contracts.Abstractions.Services;
using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Application.Services;

public class ReportsService : IReportsService
{
    private readonly ILiteViolationService _liteViolationService;
    private readonly IViolationService _violationService;

    public ReportsService(ILiteViolationService liteViolationService, IViolationService violationService)
    {
        _liteViolationService = liteViolationService;
        _violationService = violationService;
    }

    public async Task<IDictionary<string, IEnumerable<ViolationReportDto>>> GetReportsAsync()
    {
        var liteViolations = await _liteViolationService.GetAllAsync();
        var violations = await _violationService.GetAllApprovedAsync();

        return liteViolations
            .Select(GetViolationReportDto)
            .Concat(violations.Select(GetViolationReportDto))
            .GroupBy(v => v.Location)
            .ToDictionary(
                kv => kv.Key,
                kv => kv.AsEnumerable());
    }

    private static ViolationReportDto GetViolationReportDto(LiteViolationDto liteViolation)
        => new()
        {
            Id = liteViolation.Id,
            ViolationCategory = liteViolation.ViolationCategory,
            Location = liteViolation.Location,
        };

    private static ViolationReportDto GetViolationReportDto(ViolationDto violation)
        => new()
        {
            Id = violation.Id,
            ViolationCategory = violation.ViolationCategory,
            Location = violation.Location,
        };
}