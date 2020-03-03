using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.ExtracurricularActivities;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{

    [Route("api/extracurricularActivities")]
    [ValidateModel]
    public class ExtracurricularActivityController : Controller
    {
        private readonly IExtracurricularActivityService _ExtracurricularActivityService;

        public ExtracurricularActivityController(IExtracurricularActivityService ExtracurricularActivityService)
        {
            _ExtracurricularActivityService = ExtracurricularActivityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var ExtracurricularActivity = await _ExtracurricularActivityService.ListExtracurricularActivityAsync(requestListViewModel);
            return Ok(ExtracurricularActivity);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExtracurricularActivityById(Guid id)
        {
            var ExtracurricularActivity = await _ExtracurricularActivityService.GetExtracurricularActivityByIdAsync(id);
            return Ok(ExtracurricularActivity);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExtracurricularActivityManageModel ExtracurricularActivityManageModel)
        {
            var response = await _ExtracurricularActivityService.CreateExtracurricularActivityAsync(ExtracurricularActivityManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ExtracurricularActivityManageModel ExtracurricularActivityManageModel)
        {
            var response = await _ExtracurricularActivityService.UpdateExtracurricularActivityAsync(id, ExtracurricularActivityManageModel);
            return new CustomActionResult(response);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var response = await _ExtracurricularActivityService.DeleteExtracurricularActivityAsync(id);
        //    return new CustomActionResult(response);
        //}

    }

}
