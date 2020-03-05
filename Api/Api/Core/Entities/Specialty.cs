using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Specialty")]
    public class Specialty : BaseEntity
    {
        public Specialty() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public Guid MajorId { get; set; }

        [Required]
        public Guid? StandardOfCertificateId { get; set; }


        public Major Major { get; set; }
        public StandardOfCertificate StandardOfCertificate { get; set; }
        public virtual IList<Student> Students { get; set; }
    }
}
