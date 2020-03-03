using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.CertificateStatuses;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/certificateStatuses")]
    public class CertificateStatusController : Controller
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
