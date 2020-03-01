using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Class")]
    public class Class : BaseEntity
    {
        public Class() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        [Required]
        public Guid FacultyId { get; set; }

        public string Description { get; set; }



        public virtual Faculty Faculty { get; set; }
        public virtual IList<Student> Students { get; set; }
    }
}
