using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("CertificateStatus")]
    public class CertificateStatus : BaseEntity
    {
        public CertificateStatus() : base()
        {
            NationalDefenseAndSecurity = false;
            PhysicalEducation = false;
            Language = false;
            Informatics = false;
            ExtracurricularPoint = false;
        }

        [Required]
        public bool NationalDefenseAndSecurity { get; set; }

        [Required]
        public bool PhysicalEducation { get; set; }

        [Required]
        public bool Language { get; set; }

        [Required]
        public bool Informatics { get; set; }

        [Required]
        public bool ExtracurricularPoint { get; set; }


        public Student Student { get; set; }
    }
}
