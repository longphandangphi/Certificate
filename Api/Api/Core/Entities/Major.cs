using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Major")]
    public class Major : BaseEntity
    {
        public Major() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual IList<Specialty> Specialties { get; set; }
    }
}
