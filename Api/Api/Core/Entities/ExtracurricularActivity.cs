using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("ExtracurricularActivity")]
    public class ExtracurricularActivity : BaseEntity
    {
        public ExtracurricularActivity() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Semester { get; set; }

        [Required]
        public string OrganizedTime { get; set; }

        [Required]
        public string ExpectedLocation { get; set; }

        [Required]
        public string OrganizedUnit { get; set; }

        [Required]
        public int Point { get; set; }


        public virtual IList<Extracurricular> Extracurriculars { get; set; }
    }
}
