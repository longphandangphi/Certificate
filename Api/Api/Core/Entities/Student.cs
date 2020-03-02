using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("Student")]
    public class Student : BaseEntity
    {
        public Student() : base()
        {
            CertificateStatusId = Guid.NewGuid();
            ExtracurricularPointId = Guid.NewGuid();
        }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [Required]
        public string PlaceOfBirth { get; set; }

        public StudentEnums.Gender? Gender { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string Photo { get; set; }

        [Required]
        public Guid CertificateStatusId { get; set; }

        [Required]
        public Guid SpecialtyId { get; set; }

        [Required]
        public Guid ClassId { get; set; }

        [Required]
        public Guid ExtracurricularPointId { get; set; }

        //[Required]
        //public Guid HighSchoolGraduationId { get; set; }


        public virtual Class Class { get; set; }

        public virtual ExtracurricularPoint ExtracurricularPoint { get; set; }

        public virtual Specialty Specialty { get; set; }

        public virtual CertificateStatus CertificateStatus { get; set; }

        public virtual IList<Report> Reports { get; set; }
    }
}
