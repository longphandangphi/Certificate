using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Api.Core.Business.Models.Specialties
{
    public class SpecialtyManageModel : IValidatableObject
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public Guid MajorId { get; set; }

        public void GetSpecialtyFromModel(Specialty specialty)
        {
            specialty.Name = Name;
            specialty.Description = Description;
            specialty.MajorId = MajorId;
        }

        // validate
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var majorRepository = IoCHelper.GetInstance<IRepository<Major>>();
            var major = majorRepository.GetAll().FirstOrDefault(x => x.Id == MajorId);
            if (major == null)
            {
                yield return new ValidationResult("Major is not found!", new string[] { "MajorId" });
            }
            
            if (string.IsNullOrWhiteSpace(Name))
            {
                yield return new ValidationResult("SpecialtyName can't be null or WhiteSpace!", new string[] { "SpecialtyName" });
            }

            var specialtyRepository = IoCHelper.GetInstance<IRepository<Specialty>>();
            var specialty = specialtyRepository.GetAll().FirstOrDefault(x => x.Name == Name);
            if (specialty != null)
            {
                yield return new ValidationResult("SpecialtyName already exists!", new string[] { "SpecialtyName" });
            }
        }
    }
}
