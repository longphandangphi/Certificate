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

        //Task<ResponseModel> DeleteStudentAsync(Guid id);

        Task<StudentViewDetailModel> GetStudentByIdAsync(Guid? id);

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
                        .Include(x => x.CertificateStatus)
                        .Include(x => x.Specialty)
                        .Include(x => x.Class);
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
                matchedPropertyName = "Studentname";
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

            var certificateStatus = new CertificateStatus();
            _certificateStatusRepository.GetDbContext().CertificateStatuses.Add(certificateStatus);

            await _certificateStatusRepository.GetDbContext().SaveChangesAsync();

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

        //public async Task<Student> GetStudentByEmailAsync(string email)
        //{
        //    return await GetAll().FirstOrDefaultAsync(x => x.Email == email);
        //}

        //public async Task<Student> GetStudentByStudentnameAsync(string studentname)
        //{
        //    return await GetAll().FirstOrDefaultAsync(x => x.Studentname == studentname);
        //}

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
