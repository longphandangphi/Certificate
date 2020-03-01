using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("Student")]
    public class Student : BaseEntity
    {
        public Student() : base()
        {
            CertificateStatusId = Guid.NewGuid();
        }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        public string PlaceOfBirth { get; set; }

        public StudentEnums.Gender? Gender { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string Photo { get; set; }

        [Required]
        public Guid CertificateStatusId { get; set; }

        [Required]
        public Guid SpecialtyId { get; set; }

        [Required]
        public Guid ClassId { get; set; }



        public virtual Class Class { get; set; }
        public virtual Specialty Specialty { get; set; }
        public virtual CertificateStatus CertificateStatus { get; set; }
    }
}
