using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.ExtracurricularActivities;
using Api.Core.Common.Constants;
using Api.Core.Common.Reflections;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Services
{
    public interface IExtracurricularActivityService
    {
        //xem thêm sửa xóa
        Task<PagedList<ExtracurricularActivityViewModel>> ListExtracurricularActivityAsync(RequestListViewModel requestListViewModel);
        Task<ExtracurricularActivityViewModel> GetExtracurricularActivityByIdAsync(Guid? id);
        Task<ResponseModel> CreateExtracurricularActivityAsync(ExtracurricularActivityManageModel extracurricularActivityManagerModel);
        Task<ResponseModel> UpdateExtracurricularActivityAsync(Guid id, ExtracurricularActivityManageModel extracurricularActivityManagerModel);

        //Task<ResponseModel> DeleteItemAsync(Guid id);

    }
    public class ExtracurricularActivityService : IExtracurricularActivityService
    {
        private readonly IRepository<ExtracurricularActivity> _extracurricularActivityRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ExtracurricularActivityService(IRepository<ExtracurricularActivity> extracurricularActivityRepository, IMapper mapper)
        {
            _extracurricularActivityRepository = extracurricularActivityRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<ExtracurricularActivity> GetAll()
        {
            return _extracurricularActivityRepository.GetAll();
        }

        private List<string> GetAllPropertyNameOfExtracurricularActivityViewModel()
        {
            var extracurricularActivityViewModel = new ExtracurricularActivityViewModel();

            var type = extracurricularActivityViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ExtracurricularActivityViewModel>> ListExtracurricularActivityAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new ExtracurricularActivityViewModel(x)).ToListAsync();

            var extracurricularActivityViewModelProperties = GetAllPropertyNameOfExtracurricularActivityViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = extracurricularActivityViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

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

            var type = typeof(ExtracurricularActivityViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ExtracurricularActivityViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ExtracurricularActivityViewModel> GetExtracurricularActivityByIdAsync(Guid? id)
        {
            var extracurricularActivity = await _extracurricularActivityRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ExtracurricularActivityViewModel(extracurricularActivity);
        }

        public async Task<ResponseModel> CreateExtracurricularActivityAsync(ExtracurricularActivityManageModel extracurricularActivityManageModel)
        {
            var extracurricularActivity = await _extracurricularActivityRepository.FetchFirstAsync(x => x.Name == extracurricularActivityManageModel.Name);
            if (extracurricularActivity != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This ExtracurricularActivity's name is exist!",
                };
            }
            else
            {
                //var menu = await _menuResponstory.GetByIdAsync(itemManageModel.MenuId);
                extracurricularActivity = _mapper.Map<ExtracurricularActivity>(extracurricularActivityManageModel);
                //item.Menu = menu;

                await _extracurricularActivityRepository.InsertAsync(extracurricularActivity);
                extracurricularActivity = await GetAll().FirstOrDefaultAsync(x => x.Id == extracurricularActivity.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ExtracurricularActivityViewModel(extracurricularActivity)
                };
            }
        }

        public async Task<ResponseModel> UpdateExtracurricularActivityAsync(Guid id, ExtracurricularActivityManageModel extracurricularActivityManageModel)
        {
            var extracurricularActivity = await _extracurricularActivityRepository.GetByIdAsync(id);
            if (extracurricularActivity == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This ExtracurricularActivity is not exist!"
                };
            }
            else
            {
                var existedExtracurricularActivity = await _extracurricularActivityRepository.FetchFirstAsync(x => x.Name == extracurricularActivityManageModel.Name);
                if (existedExtracurricularActivity != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This ExtracurricularActivity's name is exist!"
                    };
                }
                else
                {
                    extracurricularActivityManageModel.GetExtracurricularActivityFromModel(extracurricularActivity);
                    return await _extracurricularActivityRepository.UpdateAsync(extracurricularActivity);
                }
            }
        }
    }
}
