using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.CertificateStatuses
{
    public class CertificateStatusViewModel
    {
        public CertificateStatusViewModel()
        {

        }

        public CertificateStatusViewModel(CertificateStatus certificateStatus) : this()
        {
            if (certificateStatus != null)
            {
                Id = certificateStatus.Id;
                NationalDefenseAndSecurityCertificateStatus = certificateStatus.NationalDefenseAndSecurityCertificateStatus;
                PhysicalEducationCertificateStatus = certificateStatus.PhysicalEducationCertificateStatus;
                LanguageCertificateStatus = certificateStatus.LanguageCertificateStatus;
                InformaticsCertificateStatus = certificateStatus.InformaticsCertificateStatus;
            }
        }

        public Guid Id { get; set; }

        public bool NationalDefenseAndSecurityCertificateStatus { get; set; }

        public bool PhysicalEducationCertificateStatus { get; set; }

        public bool LanguageCertificateStatus { get; set; }

        public bool InformaticsCertificateStatus { get; set; }
    }
}
