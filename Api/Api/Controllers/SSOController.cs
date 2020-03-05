using Api.Core.Business.Filters;
using Api.Core.Business.Models.Students;
using Api.Core.Business.Models.Users;
using Api.Core.Business.Services;
using Api.Core.Common.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/sso")]
    [ValidateModel]
    public class SSOController : Controller
    {
        private readonly ISSOAuthService _ssoService;
        private readonly IUserService _userService;
        private readonly IStudentService _studentService;
        private readonly IJwtHelper _jwtHelper;

        public SSOController(ISSOAuthService ssoService, IUserService userService, IStudentService studentService, IJwtHelper jwtHelper)
        {
            _ssoService = ssoService;
            _userService = userService;
            _studentService = studentService;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("adminUser")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel userRegisterModel)
        {
            var responseModel = await _userService.RegisterAsync(userRegisterModel);
            return new CustomActionResult(responseModel);
        }

        [HttpPost("student")]
        public async Task<IActionResult> RegisterStudent([FromBody] StudentRegisterModel studentRegisterModel)
        {
            var responseModel = await _studentService.RegisterAsync(studentRegisterModel);
            return new CustomActionResult(responseModel);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel userLoginModel)
        {
            var responseModel = await _ssoService.LoginAsync(userLoginModel);
            return new CustomActionResult(responseModel);
        }

        //[HttpGet("profile")]
        //public async Task<IActionResult> Profile()
        //{
        //    var accessToken = Request.Headers["x-access-token"].ToString();
        //    var jwtPayload = _jwtHelper.ValidateToken(accessToken);

        //    if (jwtPayload == null)
        //    {
        //        return Unauthorized();
        //    }
        //    else
        //    {
        //        var userViewModel = await _userService.GetProfileByIdAsync(jwtPayload.Id);

        //        if (userViewModel == null)
        //        {
        //            return NotFound("Tài khoản không tìm thấy trong hệ thống. Vui lòng kiểm tra lại!");
        //        }
        //        else
        //        {
        //            return Ok(userViewModel);
        //        }
        //    }
        //}
    }
}
