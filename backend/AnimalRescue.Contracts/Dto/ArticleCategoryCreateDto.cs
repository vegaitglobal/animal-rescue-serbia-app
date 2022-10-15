using System.ComponentModel.DataAnnotations;

namespace AnimalRescue.Contracts.Dto
{
    public class ArticleCategoryCreateDto
    {
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
    }
}
