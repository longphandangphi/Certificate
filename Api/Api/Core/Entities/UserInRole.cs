using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("UserInRole")]
    public class UserInRole : BaseEntity
    {
        public UserInRole() : base()
        {

        }

        public UserInRole(Guid userId, Guid role) 
        {
            UserId = userId;
            RoleId = role;
        }

        public Guid UserId { get; set; }

        public User User { get; set; }

        public Guid RoleId { get; set; }

        public Role Role { get; set; }
    }
}
