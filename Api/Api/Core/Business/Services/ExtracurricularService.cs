using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Extracurriculars;
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
    public interface IExtracurricularService
    {
        //xem thêm sửa xóa
        Task<PagedList<ExtracurricularViewModel>> ListExtracurricularAsync(RequestListViewModel requestListViewModel);
        Task<ExtracurricularViewModel> GetExtracurricularByIdAsync(Guid? id);
        Task<ResponseModel> CreateExtracurricularAsync(ExtracurricularManageModel extracurricularManagerModel);

        //Task<ResponseModel> UpdateExtracurricularAsync(Guid id, ExtracurricularManageModel extracurricularManagerModel);

        Task<ResponseModel> DeleteExtracurricularAsync(Guid id);

    }
    public class ExtracurricularService : IExtracurricularService
    {
        private readonly IRepository<Extracurricular> _extracurricularRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ExtracurricularService(IRepository<Extracurricular> extracurricularRepository, IMapper mapper)
        {
            _extracurricularRepository = extracurricularRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Extracurricular> GetAll()
        {
            return _extracurricularRepository.GetAll();
        }

        private List<string> GetAllPropertyNameOfExtracurricularViewModel()
        {
            var extracurricularViewModel = new ExtracurricularViewModel();

            var type = extracurricularViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ExtracurricularViewModel>> ListExtracurricularAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Id.ToString().Contains(requestListViewModel.Query)
                    )))
                .Select(x => new ExtracurricularViewModel(x)).ToListAsync();

            var extracurricularViewModelProperties = GetAllPropertyNameOfExtracurricularViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = extracurricularViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Id";
            }

            var type = typeof(ExtracurricularViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ExtracurricularViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ExtracurricularViewModel> GetExtracurricularByIdAsync(Guid? id)
        {
            var extracurricular = await _extracurricularRepository.GetByIdAsync(id);
            return new ExtracurricularViewModel(extracurricular);
        }

        public async Task<ResponseModel> CreateExtracurricularAsync(ExtracurricularManageModel extracurricularManageModel)
        {
            var extracurricular = _mapper.Map<Extracurricular>(extracurricularManageModel);

            await _extracurricularRepository.InsertAsync(extracurricular);
            extracurricular = await GetAll().FirstOrDefaultAsync(x => x.Id == extracurricular.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new ExtracurricularViewModel(extracurricular)
            };
        }

        //public async Task<ResponseModel> UpdateExtracurricularAsync(Guid id, ExtracurricularManageModel extracurricularManageModel)
        //{
        //    var extracurricular = await _extracurricularRepository.GetByIdAsync(id);
        //    if (extracurricular == null)
        //    {
        //        return new ResponseModel
        //        {
        //            StatusCode = System.Net.HttpStatusCode.NotFound,
        //            Message = "This Extracurricular is not exist!"
        //        };
        //    }
        //    else
        //    {
        //        var existedExtracurricular = await _extracurricularRepository.FetchFirstAsync(x => x.Name == extracurricularManageModel.Name);
        //        if (existedExtracurricular != null)
        //        {
        //            return new ResponseModel
        //            {
        //                StatusCode = System.Net.HttpStatusCode.BadRequest,
        //                Message = "This Extracurricular's name is exist!"
        //            };
        //        }
        //        else
        //        {
        //            extracurricularManageModel.GetExtracurricularFromModel(extracurricular);
        //            return await _extracurricularRepository.UpdateAsync(extracurricular);
        //        }
        //    }
        //}

        public async Task<ResponseModel> DeleteExtracurricularAsync(Guid id)
        {
            return await _extracurricularRepository.DeleteAsync(id);
        }
    }
}
