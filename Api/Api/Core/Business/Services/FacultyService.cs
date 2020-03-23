using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Faculties;
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
    public interface IFacultyService
    {
        //xem thêm sửa xóa
        Task<PagedList<FacultyViewModel>> ListFacultyAsync(RequestListViewModel requestListViewModel);
        Task<FacultyViewModel> GetFacultyByIdAsync(Guid? id);
        Task<ResponseModel> CreateFacultyAsync(FacultyManageModel facultyManagerModel);
        Task<ResponseModel> UpdateFacultyAsync(Guid id, FacultyManageModel facultyManagerModel);
        Task<ResponseModel> DeleteFacultyAsync(Guid id);

    }
    public class FacultyService : IFacultyService
    {
        private readonly IRepository<Faculty> _facultyRepository;
        private readonly IMapper _mapper;

        #region constructor

        public FacultyService(IRepository<Faculty> facultyRepository, IMapper mapper)
        {
            _facultyRepository = facultyRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Faculty> GetAll()
        {
            return _facultyRepository.GetAll();
        }
        
        private List<string> GetAllPropertyNameOfFacultyViewModel()
        {
            var facultyViewModel = new FacultyViewModel();

            var type = facultyViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<FacultyViewModel>> ListFacultyAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new FacultyViewModel(x)).ToListAsync();

            var facultyViewModelProperties = GetAllPropertyNameOfFacultyViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = facultyViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            //foreach (var promotionViewModelProperty in promotionViewModelProperties)
            //{
            //    var lowerTypeViewModelProperty = promotionViewModelProperty.ToLower();
            //    if (lowerTypeViewModelProperty.Equals(requestPropertyName))
            //    {
            //        matchedPropertyName = promotionViewModelProperty;
            //        break;
            //    }
            //}

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(FacultyViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<FacultyViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<FacultyViewModel> GetFacultyByIdAsync(Guid? id)
        {
            var faculty = await _facultyRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new FacultyViewModel(faculty);
        }

        public async Task<ResponseModel> CreateFacultyAsync(FacultyManageModel facultyManageModel)
        {
            var faculty = await _facultyRepository.FetchFirstAsync(x => x.Name == facultyManageModel.Name);
            if (faculty != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Faculty's name is exist!",
                };
            }
            else
            {
                //var menu = await _menuResponstory.GetByIdAsync(itemManageModel.MenuId);
                faculty = _mapper.Map<Faculty>(facultyManageModel);
                //item.Menu = menu;

                await _facultyRepository.InsertAsync(faculty);
                faculty = await GetAll().FirstOrDefaultAsync(x => x.Id == faculty.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new FacultyViewModel(faculty)
                };
            }
        }

        public async Task<ResponseModel> UpdateFacultyAsync(Guid id, FacultyManageModel facultyManageModel)
        {
            var faculty = await _facultyRepository.GetByIdAsync(id);
            if (faculty == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Faculty is not exist!"
                };
            }
            else
            {
                var existedFaculty = await _facultyRepository.FetchFirstAsync(x => x.Name == facultyManageModel.Name && x.Id != id);
                if (existedFaculty != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This Faculty's name is exist!"
                    };
                }
                else
                {
                    facultyManageModel.GetFacultyFromModel(faculty);
                    return await _facultyRepository.UpdateAsync(faculty);
                }
            }
        }

        public async Task<ResponseModel> DeleteFacultyAsync(Guid id)
        {
            var faculty = await _facultyRepository.GetByIdAsync(id);
            if (faculty == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Faculty is not exist!"
                };
            }
            else
            {
                return await _facultyRepository.DeleteAsync(id);
            }
        }
    }
}
