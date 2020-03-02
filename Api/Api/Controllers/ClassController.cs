using Api.Core.Business.Filters;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/classes")]
    [ValidateModel]
    public class ClassController : Controller
    {
        private readonly IClassService _classService;
    }
}
