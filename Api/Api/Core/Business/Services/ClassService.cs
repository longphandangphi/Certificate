using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Services
{
    public interface IClassService
    {
        Task<PagedList<ClassViewModel>> ListUserAsync(RequestListViewModel requestListViewModel);
    }
    public class ClassService
    {

    }
}
