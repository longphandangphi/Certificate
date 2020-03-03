using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("ExtracurricularPoint")]
    public class ExtracurricularPoint : BaseEntity
    {
        public ExtracurricularPoint() : base()
        {
            Point = 0;
        }

        [Required]
        public int Point { get; set; }

        public Student Student { get; set; }

        public virtual IList<Extracurricular> Extracurriculars { get; set; }
    }
}
