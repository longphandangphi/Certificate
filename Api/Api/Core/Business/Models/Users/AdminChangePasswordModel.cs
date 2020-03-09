using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Users
{
    public class AdminChangePasswordModel
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string NewPassword { get; set; }

        [Required]
        public string RepeatPassword { get; set; }
    }
}
