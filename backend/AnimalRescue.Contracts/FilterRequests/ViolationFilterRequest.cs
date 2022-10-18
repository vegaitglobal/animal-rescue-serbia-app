using AnimalRescue.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Contracts.FilterRequests
{
    public class ViolationFilterRequest
    {
        public string? Location { get; set; }

        public Guid? CategoryId { get; set; }

        public ViolationStatus? ViolationStatus { get; set; }

        public string? SearchText { get; set; }
    }
}
