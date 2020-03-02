using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Students
{
    public class StudentRegisterModel
    {
        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Username { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(32)]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; }

        [Required]
        public Guid ClassId { get; set; }

        [Required]
        public Guid SpecialtyId { get; set; }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //var roleRepository = IoCHelper.GetInstance<IRepository<Role>>();
            //if (RoleIds.Count <= 0)
            //{
            //    yield return new ValidationResult("Role is required!", new string[] { "RoleIds" });
            //}
            //foreach (var roleId in RoleIds)
            //{
            //    var role = roleRepository.GetAll().FirstOrDefault(x => x.Id == roleId);
            //    if (role == null)
            //    {
            //        yield return new ValidationResult("Role is not found!", new string[] { "RoleId" });
            //    }
            //}

            var userRepository = IoCHelper.GetInstance<IRepository<Student>>();
            var user = userRepository.GetAll().FirstOrDefault(x => x.Email == Email);
            if (user != null)
            {
                yield return new ValidationResult("Email already exists!", new string[] { "Email" });
            }

            user = userRepository.GetAll().FirstOrDefault(x => x.Username == Username);
            if (user != null)
            {
                yield return new ValidationResult("Username already exists!", new string[] { "Username" });
            }
        }
    }
}
