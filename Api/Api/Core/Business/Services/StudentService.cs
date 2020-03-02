using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Students;
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
    public interface IStudentService
    {
        Task<PagedList<StudentViewModel>> ListStudentAsync(RequestListViewModel requestListViewModel);

        Task<ResponseModel> RegisterAsync(StudentRegisterModel userRegisterModel);

        //Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel userUpdateProfileModel);

        //Task<ResponseModel> DeleteUserAsync(Guid id);

        //Task<StudentViewDetailModel> GetUserByIdAsync(Guid? id);

        //Task<User> GetUserByEmailAsync(string email);

        //Task<User> GetUserByUsernameAsync(string username);

        //Task<StudentProfileViewModel> GetProfileByIdAsync(Guid? id);

    }

    public class StudentService : IStudentService
    {
        #region Fields

        private readonly IRepository<Student> _studentRepository;
        private readonly IRepository<ExtracurricularPoint> _extracurricularPointRepository;
        private readonly IRepository<CertificateStatus> _certificateStatusRepository;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor

        public StudentService(IRepository<Student> studentRepository,
            //IRepository<UserInRole> userInRoleRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            //_userInRoleRepository = userInRoleRepository;
            _mapper = mapper;
        }

        #endregion

        #region Base Methods

        #endregion

        #region Private Methods

        private IQueryable<Student> GetAll()
        {
            return _studentRepository.GetAll()
                        .Include(x => x.ExtracurricularPoint)
                        .Include(x => x.CertificateStatus)
                        .Include(x => x.Specialty)
                        .Include(x => x.Class);
                        //.Include(x => x.UserInRoles)
                            //.ThenInclude(user => user.Role);
        }

        private List<string> GetAllPropertyNameOfStudentViewModel()
        {
            var StudentViewModel = new StudentViewModel();
            var type = StudentViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }

        #endregion

        #region Other Methods

        public async Task<PagedList<StudentViewModel>> ListStudentAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
            .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.FirstName.Contains(requestListViewModel.Query)
                    || (x.Email.Contains(requestListViewModel.Query)
                    ))))
                .Select(x => new StudentViewModel(x)).ToListAsync();

            var studentViewModelProperties = GetAllPropertyNameOfStudentViewModel();
            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;
            string matchedPropertyName = studentViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Username";
            }

            var type = typeof(StudentViewModel);
            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<StudentViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ResponseModel> RegisterAsync(StudentRegisterModel studentRegisterModel)
        {
            var student = _mapper.Map<Student>(studentRegisterModel);
            studentRegisterModel.Password.GeneratePassword(out string saltKey, out string hashPass);
            student.Password = hashPass;
            student.PasswordSalt = saltKey;

            await _studentRepository.InsertAsync(student);

            var userInRoles = new List<UserInRole>();
            //foreach (var roleId in userRegisterModel.RoleIds)
            //{
            //    userInRoles.Add(new UserInRole()
            //    {
            //        UserId = student.Id,
            //        RoleId = roleId
            //    });
            //}
            //_userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
            //await _userInRoleRepository.GetDbContext().SaveChangesAsync();

            student = await GetAll().FirstOrDefaultAsync(x => x.Id == student.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new StudentViewModel(student),
            };
        }

        //public async Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel studentUpdateProfileModel)
        //{
        //    var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //    if (user == null)
        //    {
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.NotFound,
        //            Message = "User is not exist. Please try again!"
        //        };
        //    }
        //    else
        //    {
        //        await _userInRoleRepository.DeleteAsync(user.UserInRoles);

        //        var userInRoles = new List<UserInRole>();
        //        foreach (var roleId in userUpdateProfileModel.RoleIds)
        //        {
        //            userInRoles.Add(new UserInRole()
        //            {
        //                UserId = user.Id,
        //                RoleId = roleId
        //            });
        //        }

        //        _userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
        //        await _userInRoleRepository.GetDbContext().SaveChangesAsync();

        //        userUpdateProfileModel.SetUserModel(user);
        //        await _userRepository.UpdateAsync(user);

        //        user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //        return new ResponseModel
        //        {
        //            StatusCode = System.Net.HttpStatusCode.OK,
        //            Data = new UserViewDetailModel(user)
        //        };
        //    }
        //}

        //public async Task<ResponseModel> DeleteUserAsync(Guid id)
        //{
        //    var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //    if (user == null)
        //    {
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.NotFound,
        //            Message = "User is not exist. Please try again!"
        //        };
        //    }
        //    else
        //    {
        //        await _userInRoleRepository.DeleteAsync(user.UserInRoles);

        //        return await _userRepository.DeleteAsync(id);
        //    }
        //}

        //public async Task<UserViewDetailModel> GetUserByIdAsync(Guid? id)
        //{
        //    var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //    return new UserViewDetailModel(user);
        //}

        //public async Task<User> GetUserByEmailAsync(string email)
        //{
        //    return await GetAll().FirstOrDefaultAsync(x => x.Email == email);
        //}

        //public async Task<User> GetUserByUsernameAsync(string username)
        //{
        //    return await GetAll().FirstOrDefaultAsync(x => x.Username == username);
        //}

        //public async Task<UserProfileViewModel> GetProfileByIdAsync(Guid? id)
        //{
        //    var user = await GetAll()
        //        .FirstOrDefaultAsync(x => x.Id == id);
        //    if (user == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        return new UserProfileViewModel(user);
        //    }
        //}

        #endregion
    }
}
