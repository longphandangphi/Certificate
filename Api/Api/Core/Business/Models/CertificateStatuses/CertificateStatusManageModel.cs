using Api.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Business.Models.CertificateStatuses
{
    public class CertificateStatusManageModel
    {
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

        public void GetCertificateStatusFromModel(CertificateStatus certificateStatus)
        {
            certificateStatus.NationalDefenseAndSecurityCertificateStatus = NationalDefenseAndSecurityCertificateStatus;
            certificateStatus.PhysicalEducationCertificateStatus = PhysicalEducationCertificateStatus;
            certificateStatus.LanguageCertificateStatus = LanguageCertificateStatus;
            certificateStatus.InformaticsCertificateStatus = InformaticsCertificateStatus;
            certificateStatus.ExtracurricularPointStatus = ExtracurricularPointStatus;
        }

        //validate trung ten?

    }
}
