using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("Extracurricular")]
    public class Extracurricular : BaseEntity
    {
        public Extracurricular() : base()
        {

        }

        public Extracurricular(Guid studentId, Guid extracurricularActivityId) 
        {
            StudentId = studentId;
            ExtracurricularActivityId = extracurricularActivityId;
        }

        //[Required]
        //public Guid ExtracurricularPointId { get; set; }

        //public ExtracurricularPoint ExtracurricularPoint { get; set; }

        [Required]
        public Guid StudentId { get; set; }

        public Student Student { get; set; }

        [Required]
        public Guid ExtracurricularActivityId { get; set; }

        public ExtracurricularActivity ExtracurricularActivity { get; set; }
    }
}
