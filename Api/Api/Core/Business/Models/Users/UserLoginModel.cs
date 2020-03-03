using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Business.Models.Users
{
    public class UserLoginModel : IValidatableObject
    {
        [StringLength(512)]
        [Required]
        public string Email { get; set; }

        [StringLength(512)]
        [Required]
        public string Password { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            if (string.IsNullOrEmpty(Email))
            {
                yield return new ValidationResult("Username is required!", new string[] { "Username" });
            }
        }
    }
}
