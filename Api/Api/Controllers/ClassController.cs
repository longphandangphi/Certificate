using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Classes;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/classes")]
    [ValidateModel]
    public class ClassController : Controller
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classEntityService)
        {
            _classService = classEntityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var classEntity = await _classService.ListClassAsync(requestListViewModel);
            return Ok(classEntity);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassById(Guid id)
        {
            var classEntity = await _classService.GetClassByIdAsync(id);
            return Ok(classEntity);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ClassManageModel classEntityManageModel)
        {
            var response = await _classService.CreateClassAsync(classEntityManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ClassManageModel classEntityManageModel)
        {
            var response = await _classService.UpdateClassAsync(id, classEntityManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _classService.DeleteClassAsync(id);
            return new CustomActionResult(response);
        }

    }
}
