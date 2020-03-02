using Api.Core.Business.Filters;
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
        //private readonly ISpecialtyService _specialtyService;

        //public SpecialtyController(ISpecialtyService specialtyService)
        //{
        //    _specialtyService = specialtyService;
        //}

        //#region GET

        //[HttpGet]
        //public async Task<IActionResult> GetAll(RequestListViewModel userRequestListViewModel)
        //{
        //    var users = await _userService.ListUserAsync(userRequestListViewModel);
        //    return Ok(users);
        //}

        //[HttpGet("{id}")]
        ////[CustomAuthorize]
        //public async Task<IActionResult> GetUserById(Guid id)
        //{
        //    var user = await _userService.GetUserByIdAsync(id);
        //    return Ok(user);
        //}

        ////[HttpGet("email/{email}")]
        ////[CustomAuthorize]
        ////public async Task<IActionResult> GetUserByEmail(string email)
        ////{
        ////    var user = await _userService.GetUserByEmailAsync(email);
        ////    return Ok(user);
        ////}

        //#endregion

        //#region POST

        //#endregion

        //#region PUT

        //[HttpPut("{id}")]
        ////[CustomAuthorize]
        //public async Task<IActionResult> Put(Guid id, [FromBody] UserUpdateProfileModel userUpdateProfileModel)
        //{
        //    var responseModel = await _userService.UpdateProfileAsync(id, userUpdateProfileModel);
        //    return new CustomActionResult(responseModel);
        //}

        //#endregion

        //#region DELETE

        //[HttpDelete("{id}")]
        ////[CustomAuthorize]
        //public async Task<IActionResult> Delete(Guid id)
        //{
        //    var responseModel = await _userService.DeleteUserAsync(id);
        //    return new CustomActionResult(responseModel);
        //}

        //#endregion

        //#region Other Methods

        //#endregion
    }
}
