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
        Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel);
    }

    public class SSOAuthService : ISSOAuthService
    {
        private readonly IUserService _userService;
        private readonly IJwtHelper _jwtHelper;

        public SSOAuthService(IUserService userService, IJwtHelper jwtHelper)
        {
            _userService = userService;
            _jwtHelper = jwtHelper;
        }
        public async Task<ResponseModel> LoginAsync(UserLoginModel userLoginModel)
        {
            var user = await _userService.GetUserByUsernameAsync(userLoginModel.Username);
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
