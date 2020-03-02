using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Students
{
    public class StudentProfileViewModel
    {
        public StudentProfileViewModel()
        {

        }

        public StudentProfileViewModel(Student student) : this()
        {
            if (student != null)
            {
                Id = student.Id;
                FirstName = student.FirstName;
                LastName = student.LastName;
                Photo = student.Photo;
                DateOfBirth = student.DateOfBirth;
                Email = student.Email;
                Gender = student.Gender;
            }
        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public StudentEnums.Gender? Gender { get; set; }
    }
}
