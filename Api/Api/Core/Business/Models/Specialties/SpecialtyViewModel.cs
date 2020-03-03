using Api.Core.Business.Models.Majors;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Specialties
{
    public class SpecialtyViewModel
    {
        public SpecialtyViewModel()
        {

        }

        public SpecialtyViewModel(Specialty specialty) : this()
        {
            Id = specialty.Id;
            Name = specialty.Name;
            Description = specialty.Description;
            Major = new MajorViewModel(specialty.Major);
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public MajorViewModel Major { get; set; }
    }
}
