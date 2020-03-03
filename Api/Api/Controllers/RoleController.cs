using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Roles;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/roles")]
    [ValidateModel]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(RequestListViewModel roleRequestListViewModel)
        {
            var roles = await _roleService.ListRoleAsync(roleRequestListViewModel);
            return Ok(roles);
        }

        [HttpGet("by-name")]
        public async Task<IActionResult> GetbyName(string name)
        {
            var role = await _roleService.GetRoleByNameAsync(name);
            if (role == null)
            {
                return NotFound("Name is not found!");
            }
            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RoleManageModel roleManagerModel)
        {
            var response = await _roleService.CreateRoleAsync(roleManagerModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] RoleManageModel roleManageModel)
        {
            var response = await _roleService.UpdateRoleAsync(id, roleManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _roleService.DeleteRoleAsync(id);
            return new CustomActionResult(response);
        }
    }
}
