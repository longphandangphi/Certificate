using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Users;
using Api.Core.Common.Constants;
using Api.Core.Common.Reflections;
using Api.Core.Common.Utilities;
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
    public interface IUserService
    {
        Task<PagedList<UserViewModel>> ListUserAsync(RequestListViewModel requestListViewModel);

        Task<ResponseModel> RegisterAsync(UserRegisterModel userRegisterModel);

        Task<ResponseModel> UpdateProfileAsync(Guid id, UserUpdateProfileModel userUpdateProfileModel);

        Task<ResponseModel> DeleteUserAsync(Guid id);

        Task<UserViewDetailModel> GetUserByIdAsync(Guid? id);

        Task<User> GetUserByEmailAsync(string email);

        Task<User> GetUserByUsernameAsync(string username);

        Task<UserProfileViewModel> GetProfileByIdAsync(Guid? id);

    }

    public class UserService : IUserService
    {
        #region Fields

        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserInRole> _userInRoleRepository;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor

        public UserService(IRepository<User> userRepository,
            IRepository<UserInRole> userInRoleRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _userInRoleRepository = userInRoleRepository;
            _mapper = mapper;
        }

        #endregion

        #region Base Methods

        #endregion

        #region Private Methods

        private IQueryable<User> GetAll()
        {
            return _userRepository.GetAll()
                        .Include(x => x.UserInRoles)
                            .ThenInclude(user => user.Role);
        }

        private List<string> GetAllPropertyNameOfUserViewModel()
        {
            var userViewModel = new UserViewModel();
            var type = userViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        #region Other Methods

        public async Task<PagedList<UserViewModel>> ListUserAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.FullName.Contains(requestListViewModel.Query)
                    || (x.Email.Contains(requestListViewModel.Query)
                    ))))
                .Select(x => new UserViewModel(x)).ToListAsync();

            var userViewModelProperties = GetAllPropertyNameOfUserViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = userViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Username";
            }

            var type = typeof(UserViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<UserViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ResponseModel> RegisterAsync(UserRegisterModel userRegisterModel)
        {
            var user = _mapper.Map<User>(userRegisterModel);
            userRegisterModel.Password.GeneratePassword(out string saltKey, out string hashPass);
            user.Password = hashPass;
            user.PasswordSalt = saltKey;

            await _userRepository.InsertAsync(user);

            // Tạo userInRoles để add vào DB vì tạo user phải tạo luôn UserInRole (tương tự lúc update)
            var userInRoles = new List<UserInRole>();
            foreach (var roleId in userRegisterModel.RoleIds)
            {
                userInRoles.Add(new UserInRole()
                {
                    UserId = user.Id,
                    RoleId = roleId
                });
            }

            // Add userInRoles vào DB 
            _userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
            await _userInRoleRepository.GetDbContext().SaveChangesAsync();

            user = await GetAll().FirstOrDefaultAsync(x => x.Id == user.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new UserViewModel(user),
            };
        }

        public async Task<ResponseModel> UpdateProfileAsync(Guid id, UserUpdateProfileModel userUpdateProfileModel)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "User is not exist. Please try again!"
                };
            }
            else
            {
                await _userInRoleRepository.DeleteAsync(user.UserInRoles);
                
                var userInRoles = new List<UserInRole>();
                foreach (var roleId in userUpdateProfileModel.RoleIds)
                {
                    userInRoles.Add(new UserInRole()
                    {
                        UserId = user.Id,
                        RoleId = roleId
                    });
                }
                
                _userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
                await _userInRoleRepository.GetDbContext().SaveChangesAsync();

                userUpdateProfileModel.SetUserModel(user);
                await _userRepository.UpdateAsync(user);

                user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new UserViewDetailModel(user)
                };
            }
        }

        public async Task<ResponseModel> DeleteUserAsync(Guid id)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "User is not exist. Please try again!"
                };
            }
            else
            {
                await _userInRoleRepository.DeleteAsync(user.UserInRoles);

                return await _userRepository.DeleteAsync(id);
            }
        }

        public async Task<UserViewDetailModel> GetUserByIdAsync(Guid? id)
        {
            var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new UserViewDetailModel(user);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Username == username);
        }

        public async Task<UserProfileViewModel> GetProfileByIdAsync(Guid? id)
        {
            var user = await GetAll()
                .FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return null;
            }
            else
            {
                return new UserProfileViewModel(user);
            }
        }

        #endregion
    }
}
