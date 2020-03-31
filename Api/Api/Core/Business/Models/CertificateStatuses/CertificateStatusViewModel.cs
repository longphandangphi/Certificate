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
                NationalDefenseAndSecurityCertificateStatus = certificateStatus.NationalDefenseAndSecurityCertificateStatus;
                PhysicalEducationCertificateStatus = certificateStatus.PhysicalEducationCertificateStatus;
                LanguageCertificateStatus = certificateStatus.LanguageCertificateStatus;
                InformaticsCertificateStatus = certificateStatus.InformaticsCertificateStatus;

                var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
                //StudentId = studentRepository.GetAll().FirstOrDefault(x => x.CertificateStatusId == Id);
                StudentViewModel = new StudentViewModel(studentRepository.GetAll().FirstOrDefault(x => x.CertificateStatusId == Id));

                StudentId = StudentViewModel.Id;
            }
        }

        public Guid Id { get; set; }

        public bool NationalDefenseAndSecurityCertificateStatus { get; set; }

        public bool PhysicalEducationCertificateStatus { get; set; }

        public bool LanguageCertificateStatus { get; set; }

        public bool InformaticsCertificateStatus { get; set; }

        public StudentViewModel StudentViewModel { get; set; }

        public Guid StudentId { get; set; }
    }
}
