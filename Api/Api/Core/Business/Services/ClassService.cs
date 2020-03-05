using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Classes;
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
    public interface IClassService
    {
        Task<PagedList<ClassViewModel>> ListClassAsync(RequestListViewModel requestListViewModel);
        Task<ClassViewModel> GetClassByIdAsync(Guid? id);
        Task<ResponseModel> CreateClassAsync(ClassManageModel classEntityManagerModel);
        Task<ResponseModel> UpdateClassAsync(Guid id, ClassManageModel classEntityManagerModel);

        //Task<ResponseModel> DeleteItemAsync(Guid id);
    }

    public class ClassService : IClassService
    {
        private readonly IRepository<Class> _classRepository;
        private readonly IRepository<Faculty> _facultyRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ClassService(IRepository<Class> classEntityRepository, IRepository<Faculty> facultyRepository, IMapper mapper)
        {
            _classRepository = classEntityRepository;
            _facultyRepository = facultyRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Class> GetAll()
        {
            return _classRepository.GetAll().Include(x => x.Faculty);
        }

        private List<string> GetAllPropertyNameOfClassViewModel()
        {
            var classEntityViewModel = new ClassViewModel();

            var type = classEntityViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ClassViewModel>> ListClassAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new ClassViewModel(x)).ToListAsync();

            var classEntityViewModelProperties = GetAllPropertyNameOfClassViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = classEntityViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(ClassViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ClassViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ClassViewModel> GetClassByIdAsync(Guid? id)
        {
            var classEntity = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ClassViewModel(classEntity);
        }

        public async Task<ResponseModel> CreateClassAsync(ClassManageModel classManageModel)
        {
            var checkName = await _classRepository.GetAll().FirstOrDefaultAsync(x => x.Name == classManageModel.Name);
            if (checkName != null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Class's name is exist!"
                };
            }

            var classEntity = _mapper.Map<Class>(classManageModel);

            await _classRepository.InsertAsync(classEntity);
            classEntity = await GetAll().FirstOrDefaultAsync(x => x.Id == classEntity.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new ClassViewModel(classEntity)
            };
        }

        public async Task<ResponseModel> UpdateClassAsync(Guid id, ClassManageModel classManageModel)
        {
            var classEntity = await _classRepository.GetByIdAsync(id);
            if (classEntity == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Class is not exist!"
                };
            }
            else
            {
                var checkName = await _classRepository.GetAll().FirstOrDefaultAsync(x => x.Name == classManageModel.Name && x.Id != id);
                if (checkName != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.NotFound,
                        Message = "This Class's name is exist!"
                    };
                }

                classManageModel.GetClassFromModel(classEntity);
                return await _classRepository.UpdateAsync(classEntity);
            }
        }
    }
}
