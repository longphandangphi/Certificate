using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Majors;
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
    public interface IMajorService
    {
        //xem thêm sửa xóa
        Task<PagedList<MajorViewModel>> ListMajorAsync(RequestListViewModel requestListViewModel);
        Task<MajorViewModel> GetMajorByIdAsync(Guid? id);
        Task<ResponseModel> CreateMajorAsync(MajorManageModel majorManagerModel);
        Task<ResponseModel> UpdateMajorAsync(Guid id, MajorManageModel majorManagerModel);

        //Task<ResponseModel> DeleteItemAsync(Guid id);

    }
    public class MajorService : IMajorService
    {
        private readonly IRepository<Major> _majorRepository;
        private readonly IMapper _mapper;

        #region constructor

        public MajorService(IRepository<Major> majorRepository, IMapper mapper)
        {
            _majorRepository = majorRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Major> GetAll()
        {
            return _majorRepository.GetAll();
        }

        private List<string> GetAllPropertyNameOfMajorViewModel()
        {
            var majorViewModel = new MajorViewModel();

            var type = majorViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<MajorViewModel>> ListMajorAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new MajorViewModel(x)).ToListAsync();

            var majorViewModelProperties = GetAllPropertyNameOfMajorViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = majorViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

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

            var type = typeof(MajorViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<MajorViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<MajorViewModel> GetMajorByIdAsync(Guid? id)
        {
            var major = await _majorRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new MajorViewModel(major);
        }

        public async Task<ResponseModel> CreateMajorAsync(MajorManageModel majorManageModel)
        {
            var major = await _majorRepository.FetchFirstAsync(x => x.Name == majorManageModel.Name);
            if (major != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Major's name is exist!",
                };
            }
            else
            {
                //var menu = await _menuResponstory.GetByIdAsync(itemManageModel.MenuId);
                major = _mapper.Map<Major>(majorManageModel);
                //item.Menu = menu;

                await _majorRepository.InsertAsync(major);
                major = await GetAll().FirstOrDefaultAsync(x => x.Id == major.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new MajorViewModel(major)
                };
            }
        }

        public async Task<ResponseModel> UpdateMajorAsync(Guid id, MajorManageModel majorManageModel)
        {
            var major = await _majorRepository.GetByIdAsync(id);
            if (major == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Major is not exist!"
                };
            }
            else
            {
                var existedMajor = await _majorRepository.FetchFirstAsync(x => x.Name == majorManageModel.Name);
                if (existedMajor != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This Major's name is exist!"
                    };
                }
                else
                {
                    majorManageModel.GetMajorFromModel(major);
                    return await _majorRepository.UpdateAsync(major);
                }
            }
        }
    }
}
