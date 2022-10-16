using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.Pagination
{
    public class PaginatedResponse<T> where T : class
    {
        public int PageNumber { get; set; }

        public int FilteredCount { get; set; }

        public IEnumerable<T> Entities { get; set; }
    }
}
