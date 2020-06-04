using Api.Core.Business.IoC;
using Api.Core.Business.Models.Students;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.CertificateStatuses
{
    public class CertificateStatusViewModel
    {
        public CertificateStatusViewModel()
        {

        }

        public CertificateStatusViewModel(CertificateStatus certificateStatus) : this()
        {
            if (certificateStatus != null)
            {
                Id = certificateStatus.Id;
                NationalDefenseAndSecurity = certificateStatus.NationalDefenseAndSecurity;
                PhysicalEducation = certificateStatus.PhysicalEducation;
                Language = certificateStatus.Language;
                Informatics = certificateStatus.Informatics;
                ExtracurricularPoint = certificateStatus.ExtracurricularPoint;
                //var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
                //StudentId = studentRepository.GetAll().FirstOrDefault(x => x.CertificateStatusId == Id);
                //StudentViewModel = new StudentViewModel(studentRepository.GetAll().FirstOrDefault(x => x.CertificateStatusId == Id));

                //StudentId = StudentViewModel.Id;
            }
        }

        public Guid Id { get; set; }

        public bool NationalDefenseAndSecurity { get; set; }

        public bool PhysicalEducation { get; set; }

        public bool Language { get; set; }

        public bool Informatics { get; set; }

        public bool ExtracurricularPoint { get; set; }

        //public StudentViewModel StudentViewModel { get; set; }

        //public Guid StudentId { get; set; }
    }
}
