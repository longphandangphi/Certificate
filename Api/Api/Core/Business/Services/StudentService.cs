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

        Task<ResponseModel> RegisterAsync(StudentRegisterModel studentRegisterModel);

        // Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel studentUpdateProfileModel);

        Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel studentUpdateProfileModel);

        //Task<ResponseModel> DeleteStudentAsync(Guid id);

        Task<StudentViewDetailModel> GetStudentByIdAsync(Guid? id);

        Task<StudentViewDetailModel> GetStudentBySelfIdAsync(Guid? id);

        Task<Student> GetStudentByEmailAsync(string username);

        Task<ResponseModel> ChangeStudentPasswordAsync(Guid id, StudentChangePasswordModel studentChangePasswordModel);

        //Task<Student> GetStudentByEmailAsync(string email);

        //Task<Student> GetStudentByStudentnameAsync(string studentname);

        //Task<StudentProfileViewModel> GetProfileByIdAsync(Guid? id);

    }

    public class StudentService : IStudentService
    {
        #region Fields

        private readonly IRepository<Student> _studentRepository;
        private readonly IRepository<CertificateStatus> _certificateStatusRepository;
        private readonly IMapper _mapper;

        #endregion

        #region Constructor

        public StudentService(IRepository<Student> studentRepository,
            IRepository<CertificateStatus> certificateStatusRepository,
            IMapper mapper)
        {
            _studentRepository = studentRepository;
            _certificateStatusRepository = certificateStatusRepository;
            _mapper = mapper;
        }

        #endregion

        #region Base Methods

        #endregion

        #region Private Methods

        private IQueryable<Student> GetAll()
        {
            return _studentRepository.GetAll()
                        .Include(x => x.Class)
                        .Include(x => x.Specialty)
                        .Include(x => x.CertificateStatus)
                        .Include(x => x.Specialty)
                            .ThenInclude(x => x.Major)
                        .Include(x => x.Specialty)
                            .ThenInclude(x => x.StandardOfCertificate)
                        .Include(x => x.Class)
                            .ThenInclude(x => x.Faculty);
                        //.Include(x => x.StudentInRoles)
                            //.ThenInclude(student => student.Role);
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
                matchedPropertyName = "Id";
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

            // tạo CertificateStatus cho student
            var certificateStatus = new CertificateStatus();
            // gán id cho student
            student.CertificateStatusId = certificateStatus.Id;
            _certificateStatusRepository.GetDbContext().CertificateStatuses.Add(certificateStatus);
            await _certificateStatusRepository.GetDbContext().SaveChangesAsync();

            await _studentRepository.InsertAsync(student);

            //var studentInRoles = new List<StudentInRole>();
            //foreach (var roleId in studentRegisterModel.RoleIds)
            //{
            //    studentInRoles.Add(new StudentInRole()
            //    {
            //        StudentId = student.Id,
            //        RoleId = roleId
            //    });
            //}
            //_studentInRoleRepository.GetDbContext().StudentInRoles.AddRange(studentInRoles);
            //await _studentInRoleRepository.GetDbContext().SaveChangesAsync();

            student = await GetAll().FirstOrDefaultAsync(x => x.Id == student.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new StudentViewModel(student),
            };
        }

        public async Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel studentUpdateProfileModel)
        {
            var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "User is not exist. Please try again!"
                };
            }
            else
            {
                //await _userInRoleRepository.DeleteAsync(user.UserInRoles);

                //var userInRoles = new List<UserInRole>();
                //foreach (var roleId in userUpdateProfileModel.RoleIds)
                //{
                //    userInRoles.Add(new UserInRole()
                //    {
                //        UserId = user.Id,
                //        RoleId = roleId
                //    });
                //}

                //_userInRoleRepository.GetDbContext().UserInRoles.AddRange(userInRoles);
                //await _userInRoleRepository.GetDbContext().SaveChangesAsync();

                studentUpdateProfileModel.SetUserModel(student);
                await _studentRepository.UpdateAsync(student);

                student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new StudentViewModel(student)
                };
            }
        }

        //public async Task<ResponseModel> UpdateProfileAsync(Guid id, StudentUpdateProfileModel studentUpdateProfileModel)
        //{
        //    var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //    if (student == null)
        //    {
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.NotFound,
        //            Message = "Student is not exist. Please try again!"
        //        };
        //    }
        //    else
        //    {
        //        await _studentInRoleRepository.DeleteAsync(student.StudentInRoles);

        //        var studentInRoles = new List<StudentInRole>();
        //        foreach (var roleId in studentUpdateProfileModel.RoleIds)
        //        {
        //            studentInRoles.Add(new StudentInRole()
        //            {
        //                StudentId = student.Id,
        //                RoleId = roleId
        //            });
        //        }

        //        _studentInRoleRepository.GetDbContext().StudentInRoles.AddRange(studentInRoles);
        //        await _studentInRoleRepository.GetDbContext().SaveChangesAsync();

        //        studentUpdateProfileModel.SetStudentModel(student);
        //        await _studentRepository.UpdateAsync(student);

        //        student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //        return new ResponseModel
        //        {
        //            StatusCode = System.Net.HttpStatusCode.OK,
        //            Data = new StudentViewDetailModel(student)
        //        };
        //    }
        //}

        //public async Task<ResponseModel> DeleteStudentAsync(Guid id)
        //{
        //    var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
        //    if (student == null)
        //    {
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.NotFound,
        //            Message = "Student is not exist. Please try again!"
        //        };
        //    }
        //    else
        //    {
        //        await _studentInRoleRepository.DeleteAsync(student.StudentInRoles);

        //        return await _studentRepository.DeleteAsync(id);
        //    }
        //}

        public async Task<StudentViewDetailModel> GetStudentByIdAsync(Guid? id)
        {
            var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new StudentViewDetailModel(student);
        }
        
        public async Task<StudentViewDetailModel> GetStudentBySelfIdAsync(Guid? id)
        {
            var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new StudentViewDetailModel(student);
        }

        //public async Task<Student> GetStudentByEmailAsync(string email)
        //{
        //    return await GetAll().FirstOrDefaultAsync(x => x.Email == email);
        //}

        public async Task<Student> GetStudentByEmailAsync(string email)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<ResponseModel> ChangeStudentPasswordAsync(Guid id, StudentChangePasswordModel studentChangePasswordModel)
        {
            var student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "Student is not exist. Please try again!"
                };
            }
            else
            {
                var result = PasswordUtilities.ValidatePass(student.Password, studentChangePasswordModel.CurrentPassword, student.PasswordSalt);
                if (result)
                {
                    if (studentChangePasswordModel.RepeatPassword.Equals(studentChangePasswordModel.NewPassword))
                    {
                        studentChangePasswordModel.NewPassword.GeneratePassword(out string saltKey, out string hashPass);
                        student.Password = hashPass;
                        student.PasswordSalt = saltKey;

                        await _studentRepository.UpdateAsync(student);

                        student = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
                        return new ResponseModel
                        {
                            StatusCode = System.Net.HttpStatusCode.OK,
                            Data = new StudentViewModel(student)
                        };
                    }
                    else
                    {
                        return new ResponseModel()
                        {
                            StatusCode = System.Net.HttpStatusCode.NotFound,
                            Message = "RepeatPassword and NewPassword are not the same!"
                        };
                    }
                }
                else
                {
                    return new ResponseModel()
                    {
                        StatusCode = System.Net.HttpStatusCode.NotFound,
                        Message = "Current password is not correct!"
                    };
                }
            }
        }

        //public async Task<StudentProfileViewModel> GetProfileByIdAsync(Guid? id)
        //{
        //    var student = await GetAll()
        //        .FirstOrDefaultAsync(x => x.Id == id);
        //    if (student == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        return new StudentProfileViewModel(student);
        //    }
        //}

        #endregion
    }
}
