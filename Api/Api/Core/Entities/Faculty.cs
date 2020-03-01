using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Faculty")]
    public class Faculty : BaseEntity
    {
        public Faculty() : base()
        {

        }
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual IList<Class> MyProperty { get; set; }
    }
}