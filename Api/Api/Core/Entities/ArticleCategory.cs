using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("ArticleCategory")]
    public class ArticleCategory : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        public string Picture { get; set; }

        public virtual IList<Article> Articles { get; set; }
    }
}
