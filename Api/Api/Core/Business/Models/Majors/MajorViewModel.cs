using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Majors
{
    public class MajorViewModel
    {
        public MajorViewModel()
        {

        }

        public MajorViewModel(Major major) : this()
        {
            if (major != null)
            {
                Id = major.Id;
                Name = major.Name;
                Description = major.Description;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
