using AnimalRescue.Contracts.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Abstractions.Services
{
    public interface ILocationService
    {

        Task<IEnumerable<string>> GetAllAsync();

        Task<IEnumerable<string>> GetLocationsWithViolationsAsyncTask();
    }
}
