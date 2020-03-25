using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Extracurriculars;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/extracurriculars")]
    [ValidateModel]
    public class ExtracurricularController : Controller
    {
        private readonly IExtracurricularService _extracurricularService;

        public ExtracurricularController(IExtracurricularService extracurricularService)
        {
            _extracurricularService = extracurricularService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var extracurricular = await _extracurricularService.ListExtracurricularAsync(requestListViewModel);
            return Ok(extracurricular);
        }

        [HttpGet("{studentId}/student")]
        public async Task<IActionResult> GetAllByStudentId(Guid studentId, [FromQuery] RequestListViewModel requestListViewModel)
        {
            var extracurricular = await _extracurricularService.ListExtracurricularByStudentIdAsync(studentId, requestListViewModel);
            return Ok(extracurricular);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExtracurricularById(Guid id)
        {
            var extracurricular = await _extracurricularService.GetExtracurricularByIdAsync(id);
            return Ok(extracurricular);
        }

        //[HttpGet("{studentId}")]
        //public async Task<IActionResult> GetExtracurricularByStudentId(Guid studentId)
        //{
        //    var extracurricular = await _extracurricularService.GetExtracurricularByStudentIdAsync(studentId);
        //    return Ok(extracurricular);
        //}

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExtracurricularManageModel extracurricularManageModel)
        {
            var response = await _extracurricularService.CreateExtracurricularAsync(extracurricularManageModel);
            return new CustomActionResult(response);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update(Guid id, [FromBody] ExtracurricularManageModel extracurricularManageModel)
        //{
        //    var response = await _extracurricularService.UpdateExtracurricularAsync(id, extracurricularManageModel);
        //    return new CustomActionResult(response);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _extracurricularService.DeleteExtracurricularAsync(id);
            return new CustomActionResult(response);
        }

    }
}
