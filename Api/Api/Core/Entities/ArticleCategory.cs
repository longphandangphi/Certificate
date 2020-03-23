using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("ArticleCategory")]
    public class ArticleCategory : BaseEntity
    {
        public ArticleCategory() : base()
        {
            
        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual IList<Article> Articles { get; set; }
    }
}
