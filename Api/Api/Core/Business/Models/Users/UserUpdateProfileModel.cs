using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Users
{
    public class UserUpdateProfileModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(32)]
        public string FullName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public UserEnums.Gender? Gender { get; set; }

        [Required]
        public List<Guid> RoleIds { get; set; }

        public void SetUserModel(User user)
        {
            user.FullName = FullName;
            user.DateOfBirth = DateOfBirth;
            user.Gender = Gender;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var roleRepository = IoCHelper.GetInstance<IRepository<Role>>();
            if (RoleIds.Count <= 0)
            {
                yield return new ValidationResult("Role is required!", new string[] { "RoleIds" });
            }
            foreach (var roleId in RoleIds)
            {
                var role = roleRepository.GetAll().FirstOrDefault(x => x.Id == roleId);
                if (role == null)
                {
                    yield return new ValidationResult("Role is not found!", new string[] { "RoleId" });
                }
            }

            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            var user = userRepository.GetAll().FirstOrDefault(x => x.FullName == FullName);
            if (FullName.Length <= 2)
            {
                yield return new ValidationResult("Invalid FullName!", new string[] { "FullName" });
            }
        }
    }
}
