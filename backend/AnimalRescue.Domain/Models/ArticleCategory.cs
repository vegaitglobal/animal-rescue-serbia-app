using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalRescue.Domain.Models
{
    public class ArticleCategory
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsEnabled { get; set; }
    }
}
