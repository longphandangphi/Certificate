using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.StandardOfCertificates
{
    public class StandardOfCertificateViewModel
    {
        public StandardOfCertificateViewModel()
        {

        }
        public StandardOfCertificateViewModel(StandardOfCertificate standardOfCertificate) : this()
        {
            if (standardOfCertificate != null)
            {
                Id = standardOfCertificate.Id;
                Name = standardOfCertificate.Name;
                IsRequirePhysicalEducationCertificate = standardOfCertificate.IsRequirePhysicalEducationCertificate;
                PhysicalEducationCertificateMinimumRating = standardOfCertificate.PhysicalEducationCertificateMinimumRating;
                PhysicalEducationCertificateReferenceContent = standardOfCertificate.PhysicalEducationCertificateReferenceContent;
                IsRequireNationalDefenseAndSecurityCertificate = standardOfCertificate.IsRequireNationalDefenseAndSecurityCertificate;
                NationalDefenseAndSecurityCertificateMinimumRating = standardOfCertificate.NationalDefenseAndSecurityCertificateMinimumRating;
                NationalDefenseAndSecurityCertificateReferenceContent = standardOfCertificate.NationalDefenseAndSecurityCertificateReferenceContent;
                IsRequireInformaticsCertificate = standardOfCertificate.IsRequireInformaticsCertificate;
                InformaticsCertificateMinimumRating = standardOfCertificate.InformaticsCertificateMinimumRating;
                InformaticsCertificateReferenceContent = standardOfCertificate.InformaticsCertificateReferenceContent;
                IsRequireLanguageCertificate = standardOfCertificate.IsRequireLanguageCertificate;
                LanguageCertificateMinimumRating = standardOfCertificate.LanguageCertificateMinimumRating;
                LanguageCertificateReferenceContent = standardOfCertificate.LanguageCertificateReferenceContent;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsRequirePhysicalEducationCertificate { get; set; }

        public string PhysicalEducationCertificateMinimumRating { get; set; }

        public string PhysicalEducationCertificateReferenceContent { get; set; }

        public bool IsRequireNationalDefenseAndSecurityCertificate { get; set; }

        public string NationalDefenseAndSecurityCertificateMinimumRating { get; set; }

        public string NationalDefenseAndSecurityCertificateReferenceContent { get; set; }

        public bool IsRequireInformaticsCertificate { get; set; }

        public string InformaticsCertificateMinimumRating { get; set; }

        public string InformaticsCertificateReferenceContent { get; set; }

        public bool IsRequireLanguageCertificate { get; set; }

        public string LanguageCertificateMinimumRating { get; set; }

        public string LanguageCertificateReferenceContent { get; set; }
    }
}
