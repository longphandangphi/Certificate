using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Faculties
{
    public class FacultyViewModel
    {
        public FacultyViewModel()
        {

        }

        public FacultyViewModel(Faculty faculty) : this()
        {
            if (faculty != null)
            {
                Id = faculty.Id;
                Name = faculty.Name;
                Description = faculty.Description;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
