using Api.Core.Business.Filters;
using Api.Core.Business.IoC;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.CertificateStatuses;
using Api.Core.Business.Services;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/certificateStatuses")]
    public class CertificateStatusController : BaseController
    {
        private readonly ICertificateStatusService _certificateStatusService;

        public CertificateStatusController(ICertificateStatusService certificateStatusService)
        {
            _certificateStatusService = certificateStatusService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var certificateStatus = await _certificateStatusService.ListCertificateStatusAsync(requestListViewModel);
            return Ok(certificateStatus);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCertificateStatusById(Guid id)
        {
            var certificateStatus = await _certificateStatusService.GetCertificateStatusByIdAsync(id);
            return Ok(certificateStatus);
        }

        [HttpGet("self")]
        public async Task<IActionResult> GetCertificateStatus()
        {
            var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
            var SelfCertificateStatusId = studentRepository.GetAll()
                                                        .FirstOrDefault(x => x.Id == CurrentUserId).CertificateStatusId;

            var certificateStatus = await _certificateStatusService.GetCertificateStatusBySelfIdAsync(SelfCertificateStatusId);
            return Ok(certificateStatus);
        }

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CertificateStatusManageModel certificateStatusManageModel)
        //{
        //    var response = await _certificateStatusService.CreateCertificateStatusAsync(certificateStatusManageModel);
        //    return new CustomActionResult(response);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CertificateStatusManageModel certificateStatusManageModel)
        {
            var response = await _certificateStatusService.UpdateCertificateStatusAsync(id, certificateStatusManageModel);
            return new CustomActionResult(response);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var response = await _certificateStatusService.DeleteCertificateStatusAsync(id);
        //    return new CustomActionResult(response);
        //}

    }
}
