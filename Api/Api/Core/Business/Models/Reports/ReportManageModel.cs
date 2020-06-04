using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Reports
{
    public class ReportManageModel : IValidatableObject
    {
        [Required]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        public string Response { get; set; }

        [Required]
        public Guid StudentId { get; set; }

        

        public void GetReportFromModel(Report report)
        {
            report.Subject = Subject;
            report.Content = Content;
            report.Response = Response;
            report.StudentId = StudentId;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
            var student = studentRepository.GetAll().FirstOrDefault(x => x.Id == StudentId);
            if (student == null)
            {
                yield return new ValidationResult("Student is not found!", new string[] { "StudentId" });
            }
        }
    }
}
