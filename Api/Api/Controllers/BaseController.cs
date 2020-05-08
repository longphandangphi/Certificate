using Api.Core.Common.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    public class BaseController : Controller
    {
        public BaseController()
        {
            //var jwtHelper = (IJwtHelper)HttpContext.RequestServices.GetService(typeof(IJwtHelper));
            //var accessToken = HttpContext.Request.Headers["x-access-token"].ToString();
            //var jwtPayload = jwtHelper.ValidateToken(accessToken);

            //CurrentUserId = jwtPayload.Id;
        }

        public override void OnActionExecuting(ActionExecutingContext actionExecutingContext)
        {
            var jwtHelper = (IJwtHelper)actionExecutingContext.HttpContext.RequestServices.GetService(typeof(IJwtHelper));
            var accessToken = actionExecutingContext.HttpContext.Request.Headers["x-access-token"].ToString();
            if (!string.IsNullOrEmpty(accessToken))
            {
                var jwtPayload = jwtHelper.ValidateToken(accessToken);
                if (jwtPayload != null)
                {
                    CurrentUserId = jwtPayload.Id;
                }
            }

            base.OnActionExecuting(actionExecutingContext);
        }

        static public Guid? CurrentUserId { get; set; }
    }
}
