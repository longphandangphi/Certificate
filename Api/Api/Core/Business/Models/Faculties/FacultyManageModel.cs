using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Faculties
{
    public class FacultyManageModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public void GetFacultyFromModel(Faculty faculty)
        {
            faculty.Name = Name;
            faculty.Description = Description;
        }

        //validate trung ten 
    }
}
