using Api.Core.Business.Models.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Roles
{
    public class RoleViewModel : ApiBaseModel
    {
        public RoleViewModel() : base()
        {

        }
        public RoleViewModel(Role role)
        {
            if (role != null)
            {
                Id = role.Id;
                Name = role.Name;
            }
        }
    }
}
