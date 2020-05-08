using Api.Core.Business.Models.Users;
using Api.Core.Common.Helpers;
using Api.Core.Common.Utilities;
using Api.Core.DataAccess.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Services
{
    public interface ISSOAuthService
    {
        Task<ResponseModel> LoginAdminAsync(UserLoginModel userLoginModel);
        Task<ResponseModel> LoginStudentAsync(UserLoginModel userLoginModel);
    }

    public class SSOAuthService : ISSOAuthService
    {
        private readonly IUserService _userService;
        private readonly IStudentService _studentService;
        private readonly IJwtHelper _jwtHelper;

        public SSOAuthService(IUserService userService, IStudentService studentService, IJwtHelper jwtHelper)
        {
            _userService = userService;
            _studentService = studentService;
            _jwtHelper = jwtHelper;
        }
        public async Task<ResponseModel> LoginAdminAsync(UserLoginModel userLoginModel)
        {
            var user = await _userService.GetUserByEmailAsync(userLoginModel.Email);
            if (user != null)
            {
                var result = PasswordUtilities.ValidatePass(user.Password, userLoginModel.Password, user.PasswordSalt);
                if (result)
                {
                    var jwtPayload = new JwtPayload()
                    {
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email,
                        FullName = user.FullName,
                        RoleIds = user.UserInRoles != null ? user.UserInRoles.Select(x => x.RoleId).ToList() : null
                    };

                    var token = _jwtHelper.GenerateToken(jwtPayload);

                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Data = new
                        {
                            jwtPayload,
                            token = token
                        }
                    };
                }
                else
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Email or password not match!"// TODO: multi language
                    };
                }
            }
            else
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Account is not register!"// TODO: multi language
                };
            }
        }

        public async Task<ResponseModel> LoginStudentAsync(UserLoginModel userLoginModel)
        {
            var user = await _studentService.GetStudentByEmailAsync(userLoginModel.Email);
            if (user != null)
            {
                var result = PasswordUtilities.ValidatePass(user.Password, userLoginModel.Password, user.PasswordSalt);
                if (result)
                {
                    var jwtPayload = new JwtPayload()
                    {
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email,
                        FullName = user.FirstName + user.LastName,
                        //RoleIds = user.UserInRoles != null ? user.UserInRoles.Select(x => x.RoleId).ToList() : null
                    };

                    var token = _jwtHelper.GenerateToken(jwtPayload);

                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.OK,
                        Data = new
                        {
                            jwtPayload,
                            token = token
                        }
                    };
                }
                else
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "Username or password not match. Please try again!"// TODO: multi language
                    };
                }
            }
            else
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "Username is not register!"// TODO: multi language
                };
            }
        }
    }
}
