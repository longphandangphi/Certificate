using System;
using System.Threading.Tasks;
using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Users;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/users")]
    [ValidateModel]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public UserController(IUserService userService, IEmailService emailService)
        {
            _userService = userService;
            _emailService = emailService;
        }

        #region GET

        [HttpGet]
        public async Task<IActionResult> GetAll(RequestListViewModel userRequestListViewModel)
        {
            var users = await _userService.ListUserAsync(userRequestListViewModel);
            return Ok(users);
        }

        [HttpGet("{id}")]
        [CustomAuthorize]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        //[HttpGet("email/{email}")]
        //[CustomAuthorize]
        //public async Task<IActionResult> GetUserByEmail(string email)
        //{
        //    var user = await _userService.GetUserByEmailAsync(email);
        //    return Ok(user);
        //}

        #endregion

        #region POST

        #endregion

        #region PUT

        [HttpPut("{id}")]
        [CustomAuthorize]
        public async Task<IActionResult> Put(Guid id, [FromBody] UserUpdateProfileModel userUpdateProfileModel)
        {
            var responseModel = await _userService.UpdateProfileAsync(id, userUpdateProfileModel);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region DELETE

        [HttpDelete("{id}")]
        [CustomAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _userService.DeleteUserAsync(id);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region Other Methods

        #endregion
    }
}
