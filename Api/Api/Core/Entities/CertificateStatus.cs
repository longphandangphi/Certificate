using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("CertificateStatus")]
    public class CertificateStatus : BaseEntity
    {
        public CertificateStatus() : base()
        {
            NationalDefenseAndSecurityCertificateStatus = false;
            PhysicalEducationCertificateStatus = false;
            LanguageCertificateStatus = false;
            InformaticsCertificateStatus = false;
            ExtracurricularPointStatus = false;
        }

        [Required]
        public bool NationalDefenseAndSecurityCertificateStatus { get; set; }

        [Required]
        public bool PhysicalEducationCertificateStatus { get; set; }

        [Required]
        public bool LanguageCertificateStatus { get; set; }

        [Required]
        public bool InformaticsCertificateStatus { get; set; }

        [Required]
        public bool ExtracurricularPointStatus { get; set; }


        public Student Student { get; set; }
    }
}
