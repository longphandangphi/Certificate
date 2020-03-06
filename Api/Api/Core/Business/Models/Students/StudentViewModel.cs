﻿using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using Api.Core.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Students
{
    public class StudentViewModel
    {
        public StudentViewModel()
        {

        }

        public StudentViewModel(Student student) : base()
        {
            if (student != null)
            {
                Id = student.Id;
                Username = student.Username;
                FirstName = student.FirstName;
                LastName = student.LastName;
                Email = student.Email;
                Gender = student.Gender;
                DateOfBirth = student.DateOfBirth;
                ExtracurricularPoint = 0;

                var extracurricularRepository = IoCHelper.GetInstance<IRepository<Extracurricular>>();
                var extracurricularActivityRepository = IoCHelper.GetInstance<IRepository<ExtracurricularActivity>>();

                var extracurricularActivityIdArray = extracurricularRepository.GetAll()
                                                        .Where(x => x.StudentId == Id).Select(x => x.ExtracurricularActivityId).ToArray();
                
                foreach (var extracurricularActivityId in extracurricularActivityIdArray)
                {
                    ExtracurricularPoint += extracurricularActivityRepository.GetAll().FirstOrDefault(x => x.Id == extracurricularActivityId).Point;
                }
                // Lấy điểm của từng 
                //ExtracurricularPoint = studen
                //Roles = user.UserInRoles != null ? user.UserInRoles.Select(y => new RoleViewModel(y.Role)).ToArray() : null;
            }
        }

        public Guid Id { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public StudentEnums.Gender? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public int ExtracurricularPoint { get; set; }

        //public RoleViewModel[] Roles { get; set; }
    }
}
