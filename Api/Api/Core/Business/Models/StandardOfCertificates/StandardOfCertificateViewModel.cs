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
                IsRequirePhysicalEducation = standardOfCertificate.IsRequirePhysicalEducation;
                PhysicalEducationReference = standardOfCertificate.PhysicalEducationReference;
                IsRequireNationalDefenseAndSecurity = standardOfCertificate.IsRequireNationalDefenseAndSecurity;
                NationalDefenseAndSecurityReference = standardOfCertificate.NationalDefenseAndSecurityReference;
                IsRequireInformatics = standardOfCertificate.IsRequireInformatics;
                InformaticsReference = standardOfCertificate.InformaticsReference;
                IsRequireLanguage = standardOfCertificate.IsRequireLanguage;
                LanguageReference = standardOfCertificate.LanguageReference;
                IsRequireExtracurricularPoint = standardOfCertificate.IsRequireExtracurricularPoint;
                ExtracurricularPointReference = standardOfCertificate.ExtracurricularPointReference;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsRequirePhysicalEducation { get; set; }

        public string PhysicalEducationReference { get; set; }

        public bool IsRequireNationalDefenseAndSecurity { get; set; }

        public string NationalDefenseAndSecurityReference { get; set; }

        public bool IsRequireInformatics { get; set; }

        public string InformaticsReference { get; set; }

        public bool IsRequireLanguage { get; set; }

        public string LanguageReference { get; set; }

        public bool IsRequireExtracurricularPoint { get; set; }

        public string ExtracurricularPointReference { get; set; }
    }
}
