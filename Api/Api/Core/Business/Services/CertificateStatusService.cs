using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.CertificateStatuses;
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
    public interface ICertificateStatusService
    {
        //xem sửa 
        Task<PagedList<CertificateStatusViewModel>> ListCertificateStatusAsync(RequestListViewModel requestListViewModel);
        Task<CertificateStatusViewModel> GetCertificateStatusByIdAsync(Guid? id);
        Task<CertificateStatusViewModel> GetCertificateStatusBySelfIdAsync(Guid? id);

        //Task<ResponseModel> CreateCertificateStatusAsync(CertificateStatusManageModel certificateStatusManagerModel);
        Task<ResponseModel> UpdateCertificateStatusAsync(Guid id, CertificateStatusManageModel certificateStatusManagerModel);

        //Task<ResponseModel> DeleteItemAsync(Guid id);

    }
    public class CertificateStatusService : ICertificateStatusService
    {
        private readonly IRepository<CertificateStatus> _certificateStatusRepository;
        private readonly IMapper _mapper;

        #region constructor

        public CertificateStatusService(IRepository<CertificateStatus> certificateStatusRepository, IMapper mapper)
        {
            _certificateStatusRepository = certificateStatusRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<CertificateStatus> GetAll()
        {
            return _certificateStatusRepository.GetAll().Include(x => x.Student);
        }

        private List<string> GetAllPropertyNameOfCertificateStatusViewModel()
        {
            var certificateStatusViewModel = new CertificateStatusViewModel();

            var type = certificateStatusViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<CertificateStatusViewModel>> ListCertificateStatusAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Student.Id.ToString().Contains(requestListViewModel.Query)
                    )))
                .Select(x => new CertificateStatusViewModel(x)).ToListAsync();

            var certificateStatusViewModelProperties = GetAllPropertyNameOfCertificateStatusViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = certificateStatusViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

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
                matchedPropertyName = "NationalDefenseAndSecurity";
            }

            var type = typeof(CertificateStatusViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<CertificateStatusViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<CertificateStatusViewModel> GetCertificateStatusByIdAsync(Guid? id)
        {
            var certificateStatus = await _certificateStatusRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new CertificateStatusViewModel(certificateStatus);
        }

        public async Task<CertificateStatusViewModel> GetCertificateStatusBySelfIdAsync(Guid? id)
        {
            var certificateStatus = await _certificateStatusRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new CertificateStatusViewModel(certificateStatus);
        }

        //public async Task<ResponseModel> CreateCertificateStatusAsync(CertificateStatusManageModel certificateStatusManageModel)
        //{
        //    var certificateStatus = await _certificateStatusRepository.FetchFirstAsync(x => x.Name == certificateStatusManageModel.Name);
        //    if (certificateStatus != null)
        //    {
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.BadRequest,
        //            Message = "This CertificateStatus's name is exist!",
        //        };
        //    }
        //    else
        //    {
        //        //var menu = await _menuResponstory.GetByIdAsync(itemManageModel.MenuId);
        //        certificateStatus = _mapper.Map<CertificateStatus>(certificateStatusManageModel);
        //        //item.Menu = menu;

        //        await _certificateStatusRepository.InsertAsync(certificateStatus);
        //        certificateStatus = await GetAll().FirstOrDefaultAsync(x => x.Id == certificateStatus.Id);
        //        return new ResponseModel()
        //        {
        //            StatusCode = System.Net.HttpStatusCode.OK,
        //            Data = new CertificateStatusViewModel(certificateStatus)
        //        };
        //    }
        //}

        public async Task<ResponseModel> UpdateCertificateStatusAsync(Guid id, CertificateStatusManageModel certificateStatusManageModel)
        {
            var certificateStatus = await _certificateStatusRepository.GetByIdAsync(id);
            if (certificateStatus == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This CertificateStatus is not exist!"
                };
            }
            else
            {
                //var existedCertificateStatus = await _certificateStatusRepository.FetchFirstAsync(x => x.Name == certificateStatusManageModel.Name);
                //if (existedCertificateStatus != null)
                //{
                //    return new ResponseModel
                //    {
                //        StatusCode = System.Net.HttpStatusCode.BadRequest,
                //        Message = "This CertificateStatus's name is exist!"
                //    };
                //}
                //else
                //{
                    certificateStatusManageModel.GetCertificateStatusFromModel(certificateStatus);
                    return await _certificateStatusRepository.UpdateAsync(certificateStatus);
                //}
            }
        }
    }
}
