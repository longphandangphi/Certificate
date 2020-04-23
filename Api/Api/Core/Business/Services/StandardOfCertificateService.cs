using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.StandardOfCertificates;
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
    public interface IStandardOfCertificateService
    {
        //xem thêm sửa 
        Task<PagedList<StandardOfCertificateViewModel>> ListStandardOfCertificateAsync(RequestListViewModel requestListViewModel);
        Task<StandardOfCertificateViewModel> GetStandardOfCertificateByIdAsync(Guid? id);
        Task<ResponseModel> CreateStandardOfCertificateAsync(StandardOfCertificateManageModel standardOfCertificateManagerModel);
        Task<ResponseModel> UpdateStandardOfCertificateAsync(Guid id, StandardOfCertificateManageModel standardOfCertificateManagerModel);

        Task<ResponseModel> DeleteStandardOfCertificateAsync(Guid id);

    }
    public class StandardOfCertificateService : IStandardOfCertificateService
    {
        private readonly IRepository<StandardOfCertificate> _standardOfCertificateRepository;
        private readonly IMapper _mapper;

        #region constructor

        public StandardOfCertificateService(IRepository<StandardOfCertificate> standardOfCertificateRepository, IMapper mapper)
        {
            _standardOfCertificateRepository = standardOfCertificateRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<StandardOfCertificate> GetAll()
        {
            return _standardOfCertificateRepository.GetAll();
        }

        private List<string> GetAllPropertyNameOfStandardOfCertificateViewModel()
        {
            var standardOfCertificateViewModel = new StandardOfCertificateViewModel();

            var type = standardOfCertificateViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<StandardOfCertificateViewModel>> ListStandardOfCertificateAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new StandardOfCertificateViewModel(x)).ToListAsync();

            var standardOfCertificateViewModelProperties = GetAllPropertyNameOfStandardOfCertificateViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = standardOfCertificateViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "Name";
            }

            var type = typeof(StandardOfCertificateViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<StandardOfCertificateViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<StandardOfCertificateViewModel> GetStandardOfCertificateByIdAsync(Guid? id)
        {
            var standardOfCertificate = await _standardOfCertificateRepository.GetByIdAsync(id);
            return new StandardOfCertificateViewModel(standardOfCertificate);
        }

        public async Task<ResponseModel> CreateStandardOfCertificateAsync(StandardOfCertificateManageModel standardOfCertificateManageModel)
        {
            var checkName = await _standardOfCertificateRepository.GetAll().FirstOrDefaultAsync(x => x.Name == standardOfCertificateManageModel.Name);
            if (checkName != null)
            {
                return new ResponseModel
                {
                    Message = "StandardOfCertificate's name is exist!"
                };
            }

            var standardOfCertificate = await _standardOfCertificateRepository.FetchFirstAsync(x => x.Name == standardOfCertificateManageModel.Name);

            standardOfCertificate = _mapper.Map<StandardOfCertificate>(standardOfCertificateManageModel);

            await _standardOfCertificateRepository.InsertAsync(standardOfCertificate);
            standardOfCertificate = await GetAll().FirstOrDefaultAsync(x => x.Id == standardOfCertificate.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new StandardOfCertificateViewModel(standardOfCertificate)
            };

        }

        public async Task<ResponseModel> UpdateStandardOfCertificateAsync(Guid id, StandardOfCertificateManageModel standardOfCertificateManageModel)
        {
            var standardOfCertificate = await _standardOfCertificateRepository.GetByIdAsync(id);
            if (standardOfCertificate == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This StandardOfCertificate is not exist!"
                };
            }
            else
            {
                var checkName = await _standardOfCertificateRepository.GetAll().FirstOrDefaultAsync(x => x.Name == standardOfCertificateManageModel.Name && x.Id != id);
                if (checkName != null)
                {
                    return new ResponseModel
                    {
                        Message = "StandardOfCertificate's name is exist!"
                    };
                }

                standardOfCertificateManageModel.GetStandardOfCertificateFromModel(standardOfCertificate);
                return await _standardOfCertificateRepository.UpdateAsync(standardOfCertificate);
            }
        }

        public async Task<ResponseModel> DeleteStandardOfCertificateAsync(Guid id)
        {
            var standardOfCertificate = await _standardOfCertificateRepository.GetByIdAsync(id);
            if (standardOfCertificate == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This StandardOfCertificate is not exist!"
                };
            }
            else
            {
                return await _standardOfCertificateRepository.DeleteAsync(id);
            }
        }
    }
}
