using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Specialties;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/specialties")]
    [ValidateModel]
    public class SpecialtyController : Controller
    {
        private readonly ISpecialtyService _specialtyService;

        public SpecialtyController(ISpecialtyService specialtyService)
        {
            _specialtyService = specialtyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var specialty = await _specialtyService.ListSpecialtyAsync(requestListViewModel);
            return Ok(specialty);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecialtyById(Guid id)
        {
            var specialty = await _specialtyService.GetSpecialtyByIdAsync(id);
            return Ok(specialty);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SpecialtyManageModel specialtyManageModel)
        {
            var response = await _specialtyService.CreateSpecialtyAsync(specialtyManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] SpecialtyManageModel specialtyManageModel)
        {
            var response = await _specialtyService.UpdateSpecialtyAsync(id, specialtyManageModel);
            return new CustomActionResult(response);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var response = await _specialtyService.DeleteSpecialtyAsync(id);
        //    return new CustomActionResult(response);
        //}

    }
}
