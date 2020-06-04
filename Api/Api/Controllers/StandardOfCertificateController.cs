using Api.Core.Business.Filters;
using Api.Core.Business.IoC;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.StandardOfCertificates;
using Api.Core.Business.Services;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/standardOfCertificates")]
    [ValidateModel]
    public class StandardOfCertificateController : BaseController
    {
        private readonly IStandardOfCertificateService _standardOfCertificateService;

        public StandardOfCertificateController(IStandardOfCertificateService standardOfCertificateService)
        {
            _standardOfCertificateService = standardOfCertificateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var standardOfCertificate = await _standardOfCertificateService.ListStandardOfCertificateAsync(requestListViewModel);
            return Ok(standardOfCertificate);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStandardOfCertificateById(Guid id)
        {
            var standardOfCertificate = await _standardOfCertificateService.GetStandardOfCertificateByIdAsync(id);
            return Ok(standardOfCertificate);
        }

        [HttpGet("self")]
        public async Task<IActionResult> GetStandardOfCertificateBySelfId()
        {
            var studentRepository = IoCHelper.GetInstance<IRepository<Student>>();
            var specialtyId = studentRepository.GetAll().FirstOrDefault(x => x.Id == CurrentUserId).SpecialtyId;
            var specialtyRepository = IoCHelper.GetInstance<IRepository<Specialty>>();
            var selfStandardOfCertificateId = specialtyRepository.GetAll()
                                                        .FirstOrDefault(x => x.Id == specialtyId).StandardOfCertificateId;
            var standardOfCertificate = await _standardOfCertificateService.GetStandardOfCertificateBySelfIdAsync(selfStandardOfCertificateId);
            return Ok(standardOfCertificate);  
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StandardOfCertificateManageModel standardOfCertificateManageModel)
        {
            var response = await _standardOfCertificateService.CreateStandardOfCertificateAsync(standardOfCertificateManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] StandardOfCertificateManageModel standardOfCertificateManageModel)
        {
            var response = await _standardOfCertificateService.UpdateStandardOfCertificateAsync(id, standardOfCertificateManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _standardOfCertificateService.DeleteStandardOfCertificateAsync(id);
            return new CustomActionResult(response);
        }

    }
}
