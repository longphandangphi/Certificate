using Api.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Business.Models.CertificateStatuses
{
    public class CertificateStatusManageModel
    {
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

        public void GetCertificateStatusFromModel(CertificateStatus certificateStatus)
        {
            certificateStatus.NationalDefenseAndSecurity = NationalDefenseAndSecurity;
            certificateStatus.PhysicalEducation = PhysicalEducation;
            certificateStatus.Language = Language;
            certificateStatus.Informatics = Informatics;
            certificateStatus.ExtracurricularPoint = ExtracurricularPoint;
        }

        //validate trung ten?

    }
}
