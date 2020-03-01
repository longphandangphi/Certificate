using Api.Core.Business.Models.Roles;
using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Users
{
    public class UserViewDetailModel
    {
        public UserViewDetailModel()
        {

        }

        public UserViewDetailModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Username = user.Username;
                FullName = user.FullName;
                Email = user.Email;
                Gender = user.Gender;
                DateOfBirth = user.DateOfBirth;
                Roles = user.UserInRoles != null ? user.UserInRoles.Select(y => new RoleViewModel(y.Role)).ToArray() : null;
            }
        }

        public Guid Id { get; set; }

        public string Username { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public UserEnums.Gender? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public RoleViewModel[] Roles { get; set; }
    }
}
