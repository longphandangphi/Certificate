using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Article")]
    public class Article : BaseEntity
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Preview { get; set; }

        [Required]
        public string Detail { get; set; }

        public string Picture { get; set; }


        [Required]
        public Guid CategoryId { get; set; }
        public virtual ArticleCategory ArticleCategoryName { get; set; }
    }
}
