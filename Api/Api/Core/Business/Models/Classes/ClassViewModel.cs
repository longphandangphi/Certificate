using Api.Core.Business.Models.Faculties;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Classes
{
    public class ClassViewModel
    {
        public ClassViewModel()
        {

        }

        public ClassViewModel(Class classEntity) : this()
        {
            Id = classEntity.Id;
            Name = classEntity.Name;
            Description = classEntity.Description;
            Faculty = new FacultyViewModel(classEntity.Faculty);
        }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public FacultyViewModel Faculty { get; set; }

    }
}
