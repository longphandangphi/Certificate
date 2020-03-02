using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Faculties;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/faculties")]
    public class FacultyController : Controller
    {
        private readonly IFacultyService _facultyService;

        public FacultyController(IFacultyService facultyService)
        {
            _facultyService = facultyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var faculty = await _facultyService.ListFacultyAsync(requestListViewModel);
            return Ok(faculty);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacultyById(Guid id)
        {
            var faculty = await _facultyService.GetFacultyByIdAsync(id);
            return Ok(faculty);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FacultyManageModel facultyManageModel)
        {
            var response = await _facultyService.CreateFacultyAsync(facultyManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] FacultyManageModel facultyManageModel)
        {
            var response = await _facultyService.UpdateFacultyAsync(id, facultyManageModel);
            return new CustomActionResult(response);
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var response = await _facultyService.DeleteFacultyAsync(id);
        //    return new CustomActionResult(response);
        //}

    }
}
