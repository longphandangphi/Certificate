using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Entities
{
    [Table("User")]
    public class User : BaseEntity
    {
        public User() : base()
        {

        }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [StringLength(512)]
        public string AvatarUrl { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public UserEnums.Gender? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? ResetPasswordExpiryDate { get; set; }

        public virtual List<UserInRole> UserInRoles { get; set; }

        public virtual List<Article> Articles { get; set; }
    }
}
