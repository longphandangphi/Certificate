using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Roles;
using Api.Core.Common.Constants;
using Api.Core.Common.Reflections;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Services
{
    public interface IRoleService
    {
        Task<PagedList<RoleViewModel>> ListRoleAsync(RequestListViewModel userRequestListViewModel);
        Task<RoleViewModel> GetRoleByNameAsync(string name);
        Task<ResponseModel> CreateRoleAsync(RoleManageModel roleManagerModel);
        Task<ResponseModel> UpdateRoleAsync(Guid id, RoleManageModel roleManagerModel);
        Task<ResponseModel> DeleteRoleAsync(Guid id);
    }

    public class RoleService : IRoleService
    {
        #region Fields

        private readonly IRepository<Role> _roleRepository;
        private readonly IMapper _mapper;


        #endregion

        #region Constructor

        public RoleService(IRepository<Role> roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }

        #endregion

        public async Task<PagedList<RoleViewModel>> ListRoleAsync(RequestListViewModel roleRequestListViewModel)
        {
            var list = await GetAll().Where(x => (string.IsNullOrEmpty(roleRequestListViewModel.Query)
                        || (x.Name.Contains(roleRequestListViewModel.Query)))
                    ).Select(x => new RoleViewModel(x)).ToListAsync();

            var roleViewModelProperties = GetAllPropertyNameOfViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(roleRequestListViewModel.SortName) ? roleRequestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = string.Empty;

            foreach (var roleViewModelProperty in roleViewModelProperties)
            {
                var lowerTypeViewModelProperty = roleViewModelProperty.ToLower();
                if (lowerTypeViewModelProperty.Equals(requestPropertyName))
                {
                    matchedPropertyName = roleViewModelProperty;
                    break;
                }
            }

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(RoleViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = roleRequestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<RoleViewModel>(list, roleRequestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, roleRequestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<RoleViewModel> GetRoleByNameAsync(string name)
        {
            var role = await _roleRepository.FetchFirstAsync(x => x.Name == name);
            if (role == null)
            {
                return null;
            }
            else
            {
                return new RoleViewModel(role);
            }
        }

        public async Task<ResponseModel> CreateRoleAsync(RoleManageModel roleManageModel)
        {
            var role = await _roleRepository.FetchFirstAsync(x => x.Name == roleManageModel.Name);
            if (role != null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Role name is exist"
                };
            }
            else
            {
                role = _mapper.Map<Role>(roleManageModel);
                await _roleRepository.InsertAsync(role);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new RoleViewModel(role),
                };
            }
        }

        public async Task<ResponseModel> UpdateRoleAsync(Guid id, RoleManageModel roleManageModel)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This role is not exist"
                };
            }
            else
            {
                var existedRoleName = await _roleRepository.FetchFirstAsync(x => x.Name == roleManageModel.Name && x.Id != id);
                if (existedRoleName != null)
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This Role name is exist. Please try again!",
                    };
                }
                else
                {
                    roleManageModel.GetRoleFromModel(role);
                    return await _roleRepository.UpdateAsync(role);
                }
            }
        }

        public async Task<ResponseModel> DeleteRoleAsync(Guid id)
        {
            return await _roleRepository.DeleteAsync(id);
        }

        #region Private Methods

        public IQueryable<Role> GetAll()
        {
            return _roleRepository.GetAll().Where(x => !x.RecordDeleted);
        }

        private List<string> GetAllPropertyNameOfViewModel()
        {
            var userViewModel = new RoleViewModel();
            var type = userViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion
    }
}
