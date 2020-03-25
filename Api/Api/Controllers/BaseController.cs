using Api.Core.Common.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public class BaseController : Controller
    {
        public Guid? CurrentUserId { get; set; }

        public BaseController()
        {
            var jwtHelper = (IJwtHelper)HttpContext.RequestServices.GetService(typeof(IJwtHelper));
            var accessToken = HttpContext.Request.Headers["x-access-token"].ToString();
            var jwtPayload = jwtHelper.ValidateToken(accessToken);

            CurrentUserId = jwtPayload.Id;
        }
    }
}
