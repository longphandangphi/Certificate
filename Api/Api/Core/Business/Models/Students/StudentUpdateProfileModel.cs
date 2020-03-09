using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Students
{
    public class StudentUpdateProfileModel 
    {
        //[Required]
        //[MinLength(2)]
        //[MaxLength(32)]
        //public string FullName { get; set; }

        //public DateTime? DateOfBirth { get; set; }

        public StudentEnums.Gender? Gender { get; set; }

        [Required]
        public string PlaceOfBirth { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }


        //[Required]
        //public List<Guid> RoleIds { get; set; }

        public void SetUserModel(Student student)
        {
            //student.FullName = FullName;
            //student.DateOfBirth = DateOfBirth;
            
            student.Gender = Gender;
            student.PlaceOfBirth = PlaceOfBirth;
            student.Email = Email;
        }
    }
}
