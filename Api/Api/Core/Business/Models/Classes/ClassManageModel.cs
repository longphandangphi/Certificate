using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Classes
{
    public class ClassManageModel : IValidatableObject
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public Guid FacultyId { get; set; }

        public void GetClassFromModel(Class classEntity)
        {
            classEntity.Name = Name;
            classEntity.Description = Description;
            classEntity.FacultyId = FacultyId;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var facultyRepository = IoCHelper.GetInstance<IRepository<Faculty>>();
            var faculty = facultyRepository.GetAll().FirstOrDefault(x => x.Id == FacultyId);
            if (faculty == null)
            {
                yield return new ValidationResult("Faculty is not found!", new string[] { "FacultyId" });
            }

            //var standardOfCertificateRepository = IoCHelper.GetInstance<IRepository<StandardOfCertificate>>();
            //var standardOfCertificate = standardOfCertificateRepository.GetAll().FirstOrDefault(x => x.Id == StandardOfCertificateId);
            //if (standardOfCertificate == null)
            //{
            //    yield return new ValidationResult("StandardOfCertificate is not found!", new string[] { "StandardOfCertificateId" });
            //}

            //if (string.IsNullOrWhiteSpace(Name))
            //{
            //    yield return new ValidationResult("SpecialtyName can't be null or WhiteSpace!", new string[] { "SpecialtyName" });
            //}

            //var specialtyRepository = IoCHelper.GetInstance<IRepository<Specialty>>();
            //var specialty = specialtyRepository.GetAll().FirstOrDefault(x => x.Name == Name && x.Id == Id);
            //if (specialty != null)
            //{
            //    yield return new ValidationResult("SpecialtyName already exists!", new string[] { "SpecialtyName" });
            //}
        }
    }
}
