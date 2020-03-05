using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.StandardOfCertificates
{
    public class StandardOfCertificateManageModel // : IValidatableObject
    {
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

        public void GetStandardOfCertificateFromModel(StandardOfCertificate standardOfCertificate)
        {
            standardOfCertificate.Name = Name;
            standardOfCertificate.IsRequirePhysicalEducationCertificate = IsRequirePhysicalEducationCertificate;
            standardOfCertificate.PhysicalEducationCertificateMinimumRating = PhysicalEducationCertificateMinimumRating;
            standardOfCertificate.PhysicalEducationCertificateReferenceContent = PhysicalEducationCertificateReferenceContent;
            standardOfCertificate.IsRequireNationalDefenseAndSecurityCertificate = IsRequireNationalDefenseAndSecurityCertificate;
            standardOfCertificate.NationalDefenseAndSecurityCertificateMinimumRating = NationalDefenseAndSecurityCertificateMinimumRating;
            standardOfCertificate.NationalDefenseAndSecurityCertificateReferenceContent = NationalDefenseAndSecurityCertificateReferenceContent;
            standardOfCertificate.IsRequireInformaticsCertificate = IsRequireInformaticsCertificate;
            standardOfCertificate.InformaticsCertificateMinimumRating = InformaticsCertificateMinimumRating;
            standardOfCertificate.InformaticsCertificateReferenceContent = InformaticsCertificateReferenceContent;
            standardOfCertificate.IsRequireLanguageCertificate = IsRequireLanguageCertificate;
            standardOfCertificate.LanguageCertificateMinimumRating = LanguageCertificateMinimumRating;
            standardOfCertificate.LanguageCertificateReferenceContent = LanguageCertificateReferenceContent;
        }

        //validate trung ten
        //public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    //var standardOfCertificateRepository = IoCHelper.GetInstance<IRepository<StandardOfCertificate>>();
        //    //var standardOfCertificate = standardOfCertificateRepository.GetAll().FirstOrDefault(x => x.Name == Name);
        //    //if (standardOfCertificate != null)
        //    //{
        //    //    yield return new ValidationResult("StandardOfCertificateName already exists!", new string[] { "StandardOfCertificateName" });
        //    //}
        //}
    }
}
