using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Specialties;
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
    public interface ISpecialtyService
    {
        Task<PagedList<SpecialtyViewModel>> ListSpecialtyAsync(RequestListViewModel requestListViewModel);
        Task<SpecialtyViewModel> GetSpecialtyByIdAsync(Guid? id);
        Task<ResponseModel> CreateSpecialtyAsync(SpecialtyManageModel specialtyManagerModel);
        Task<ResponseModel> UpdateSpecialtyAsync(Guid id, SpecialtyManageModel specialtyManagerModel);

        //Task<ResponseModel> DeleteItemAsync(Guid id);
    }

    public class SpecialtyService : ISpecialtyService
    {
        private readonly IRepository<Specialty> _specialtyRepository;
        private readonly IRepository<Major> _majorRepository;
        private readonly IMapper _mapper;

        #region constructor

        public SpecialtyService(IRepository<Specialty> specialtyRepository, IRepository<Major> majorRepository, IMapper mapper)
        {
            _specialtyRepository = specialtyRepository;
            _majorRepository = majorRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Specialty> GetAll()
        {
            return _specialtyRepository.GetAll().Include(x => x.Major);
        }

        private List<string> GetAllPropertyNameOfSpecialtyViewModel()
        {
            var specialtyViewModel = new SpecialtyViewModel();

            var type = specialtyViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<SpecialtyViewModel>> ListSpecialtyAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new SpecialtyViewModel(x)).ToListAsync();

            var specialtyViewModelProperties = GetAllPropertyNameOfSpecialtyViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = specialtyViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

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

            var type = typeof(SpecialtyViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<SpecialtyViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<SpecialtyViewModel> GetSpecialtyByIdAsync(Guid? id)
        {
            var specialty = await _specialtyRepository.GetByIdAsync(id);
            return new SpecialtyViewModel(specialty);
        }

        public async Task<ResponseModel> CreateSpecialtyAsync(SpecialtyManageModel specialtyManageModel)
        {
            var specialty = await _specialtyRepository.FetchFirstAsync(x => x.Name == specialtyManageModel.Name);
            if (specialty != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Specialty's name is existttttttt!",
                };
            }
            else
            {
                specialty = _mapper.Map<Specialty>(specialtyManageModel);

                await _specialtyRepository.InsertAsync(specialty);
                specialty = await GetAll().FirstOrDefaultAsync(x => x.Id == specialty.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new SpecialtyViewModel(specialty)
                };
            }
        }

        public async Task<ResponseModel> UpdateSpecialtyAsync(Guid id, SpecialtyManageModel specialtyManageModel)
        {
            var specialty = await _specialtyRepository.GetByIdAsync(id);
            if (specialty == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Specialty is not exist!"
                };
            }
            else
            {
                specialtyManageModel.GetSpecialtyFromModel(specialty);
                return await _specialtyRepository.UpdateAsync(specialty);
            }
        }
    }
}
