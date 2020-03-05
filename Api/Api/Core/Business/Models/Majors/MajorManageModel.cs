using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Majors
{
    public class MajorManageModel
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public void GetMajorFromModel(Major major)
        {
            major.Name = Name;
            major.Description = Description;
        }

        //validate trung ten
    }
}
