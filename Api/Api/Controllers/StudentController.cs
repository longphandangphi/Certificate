using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Students;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/students")]
    [ValidateModel]
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;
        private readonly IEmailService _emailService;

        public StudentController(IStudentService studentService, IEmailService emailService)
        {
            _studentService = studentService;
            _emailService = emailService;
        }

        #region GET

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel studentRequestListViewModel)
        {
            var students = await _studentService.ListStudentAsync(studentRequestListViewModel);
            return Ok(students);
        }

        [HttpGet("{id}")]
        //[CustomAuthorize]
        public async Task<IActionResult> GetStudentById(Guid id)
        {
            var student = await _studentService.GetStudentByIdAsync(id);
            return Ok(student);
        }

        //[HttpGet("email/{email}")]
        //[CustomAuthorize]
        //public async Task<IActionResult> GetStudentByEmail(string email)
        //{
        //    var student = await _studentService.GetStudentByEmailAsync(email);
        //    return Ok(student);
        //}

        #endregion

        #region POST

        #endregion

        #region PUT

        [HttpPut("{id}")]
        //[CustomAuthorize]
        public async Task<IActionResult> Put(Guid id, [FromBody] StudentUpdateProfileModel studentUpdateProfileModel)
        {
            var responseModel = await _studentService.UpdateProfileAsync(id, studentUpdateProfileModel);
            return new CustomActionResult(responseModel);
        }

        [HttpPut("changePassword")]
        [CustomAuthorize]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] StudentChangePasswordModel studentChangePasswordModel)
        {
            var responseModel = await _studentService.ChangeStudentPasswordAsync(id, studentChangePasswordModel);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region DELETE

        //[HttpDelete("{id}")]
        ////[CustomAuthorize]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var responseModel = await _studentService.DeleteStudentAsync(id);
        //    return new CustomActionResult(responseModel);
        //}

        #endregion

        #region Other Methods

        #endregion
    }
}
