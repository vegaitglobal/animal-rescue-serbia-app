using AnimalRescue.Contracts.Dto;

namespace AnimalRescue.Contracts.Abstractions.Services;

public interface IReportsService
{
    Task<IDictionary<string, IEnumerable<ViolationReportDto>>> GetReportsAsync();
}