using Api.Core.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Business.Models.Roles
{
    public class RoleManageModel : IValidatableObject
    {
        public string Name { get; set; }

        public void GetRoleFromModel(Role role)
        {
            role.Name = Name;
        }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Name.Equals(""))
            {
                yield return new ValidationResult("Role name is required!", new string[] { "Name" });
            }
        }
    }
}
