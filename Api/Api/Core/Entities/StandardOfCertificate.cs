using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entities
{
    [Table("StandardOfCertificate")]
    public class StandardOfCertificate : BaseEntity
    {
        public StandardOfCertificate() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsRequirePhysicalEducationCertificate { get; set; }

        [Required]
        public string PhysicalEducationCertificateMinimumRating { get; set; }

        [Required]
        public string PhysicalEducationCertificateReferenceContent { get; set; }

        [Required]
        public bool IsRequireNationalDefenseAndSecurityCertificate { get; set; }

        [Required]
        public string NationalDefenseAndSecurityCertificateMinimumRating { get; set; }

        [Required]
        public string NationalDefenseAndSecurityCertificateReferenceContent { get; set; }

        [Required]
        public bool IsRequireInformaticsCertificate { get; set; }

        [Required]
        public string InformaticsCertificateMinimumRating { get; set; }

        [Required]
        public string InformaticsCertificateReferenceContent { get; set; }

        [Required]
        public bool IsRequireLanguageCertificate { get; set; }

        [Required]
        public string LanguageCertificateMinimumRating { get; set; }

        [Required]
        public string LanguageCertificateReferenceContent { get; set; }

        public virtual IList<Specialty> Specialty { get; set; }
    }
}
