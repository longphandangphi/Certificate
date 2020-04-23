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
        public bool IsRequirePhysicalEducation { get; set; }


        [Required]
        public string PhysicalEducationReference { get; set; }

        [Required]
        public bool IsRequireNationalDefenseAndSecurity { get; set; }


        [Required]
        public string NationalDefenseAndSecurityReference { get; set; }

        [Required]
        public bool IsRequireInformatics { get; set; }


        [Required]
        public string InformaticsReference { get; set; }

        [Required]
        public bool IsRequireLanguage { get; set; }

        [Required]
        public string LanguageReference { get; set; }

        [Required]
        public bool IsRequireExtracurricularPoint { get; set; }

        [Required]
        public string ExtracurricularPointReference { get; set; }

        public void GetStandardOfCertificateFromModel(StandardOfCertificate standardOfCertificate)
        {
            standardOfCertificate.Name = Name;
            standardOfCertificate.IsRequirePhysicalEducation = IsRequirePhysicalEducation;
            standardOfCertificate.PhysicalEducationReference = PhysicalEducationReference;
            standardOfCertificate.IsRequireNationalDefenseAndSecurity = IsRequireNationalDefenseAndSecurity;
            standardOfCertificate.NationalDefenseAndSecurityReference = NationalDefenseAndSecurityReference;
            standardOfCertificate.IsRequireInformatics = IsRequireInformatics;
            standardOfCertificate.InformaticsReference = InformaticsReference;
            standardOfCertificate.IsRequireLanguage = IsRequireLanguage;
            standardOfCertificate.LanguageReference = LanguageReference;
            standardOfCertificate.IsRequireExtracurricularPoint = IsRequireExtracurricularPoint;
            standardOfCertificate.ExtracurricularPointReference = ExtracurricularPointReference;
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
