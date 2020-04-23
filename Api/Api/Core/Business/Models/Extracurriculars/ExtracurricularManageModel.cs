using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Api.Core.Business.Models.Extracurriculars
{
    public class ExtracurricularManageModel : IValidatableObject
    {
        [Required]
        public Guid StudentId { get; set; }

        [Required]
        public Guid ExtracurricularActivityId { get; set; }

        public void GetExtracurricularFromModel(Extracurricular extracurricular)
        {
            extracurricular.StudentId = StudentId;
            extracurricular.ExtracurricularActivityId = ExtracurricularActivityId;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
            var student = studentRepository.GetAll().FirstOrDefault(x => x.Id == StudentId);
            if (student == null)
            {
                yield return new ValidationResult("Student is not found!", new string[] { "StudentId" });
            }

            var extracurricularActivityRepository = IoCHelper.GetInstance<IRepository<ExtracurricularActivity>>();
            var extracurricularActivity = extracurricularActivityRepository.GetAll().FirstOrDefault(x => x.Id == ExtracurricularActivityId);
            if (extracurricularActivity == null)
            {
                yield return new ValidationResult("ExtracurricularActivity is not found!", new string[] { "ExtracurricularActivityId" });
            }
        }
    }
}
