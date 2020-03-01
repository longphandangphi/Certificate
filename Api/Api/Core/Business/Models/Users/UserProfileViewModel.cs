using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Users
{
    public class UserProfileViewModel
    {
        public UserProfileViewModel()
        {

        }

        public UserProfileViewModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Name = user.FullName;
                Avatar = user.AvatarUrl;
                DateOfBirth = user.DateOfBirth;
                Email = user.Email;
                Gender = user.Gender;
            }
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public UserEnums.Gender? Gender { get; set; }
    }
}
