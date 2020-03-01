using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("Role")]
    public class Role : BaseEntity
    {
        public Role() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        public List<UserInRole> UserInRoles { get; set; }
    }
}
