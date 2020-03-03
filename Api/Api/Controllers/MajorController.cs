using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Majors;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/majors")]
    [ValidateModel]
    public class MajorController : Controller
    {
        private readonly IMajorService _majorService;

        public MajorController(IMajorService majorService)
        {
            _majorService = majorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var major = await _majorService.ListMajorAsync(requestListViewModel);
            return Ok(major);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMajorById(Guid id)
        {
            var major = await _majorService.GetMajorByIdAsync(id);
            return Ok(major);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MajorManageModel majorManageModel)
        {
            var response = await _majorService.CreateMajorAsync(majorManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] MajorManageModel majorManageModel)
        {
            var response = await _majorService.UpdateMajorAsync(id, majorManageModel);
            return new CustomActionResult(response);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var response = await _majorService.DeleteMajorAsync(id);
        //    return new CustomActionResult(response);
        //}

    }
}
