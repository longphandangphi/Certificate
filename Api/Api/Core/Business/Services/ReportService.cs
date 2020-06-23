using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Reports;
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
    public interface IReportService
    {
        //xem thêm sửa xóa
        Task<PagedList<ReportViewModel>> ListReportAsync(RequestListViewModel requestListViewModel);
        Task<ReportViewModel> GetReportByIdAsync(Guid? id);
        Task<ResponseModel> CreateReportAsync(ReportManageModel reportManagerModel);

        Task<ResponseModel> ResponseReportAsync(Guid id, ReportManageModel reportManagerModel);

        Task<ResponseModel> DeleteReportAsync(Guid id);

    }
    public class ReportService : IReportService
    {
        private readonly IRepository<Report> _reportRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ReportService(IRepository<Report> reportRepository, IMapper mapper)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Report> GetAll()
        {
            return _reportRepository.GetAll().Include(x => x.Student);
        }

        private List<string> GetAllPropertyNameOfReportViewModel()
        {
            var reportViewModel = new ReportViewModel();

            var type = reportViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ReportViewModel>> ListReportAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Subject.Contains(requestListViewModel.Query))
                    || (x.Content.Contains(requestListViewModel.Query))
                    || (x.CreatedOn.ToString().Contains(requestListViewModel.Query))
                    ))
                .Select(x => new ReportViewModel(x)).ToListAsync();

            var reportViewModelProperties = GetAllPropertyNameOfReportViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = reportViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "CreateOn";
            }

            var type = typeof(ReportViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            // list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();
            list = list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ReportViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ReportViewModel> GetReportByIdAsync(Guid? id)
        {
            var report = await _reportRepository.GetByIdAsync(id);
            return new ReportViewModel(report);
        }

        public async Task<ResponseModel> CreateReportAsync(ReportManageModel reportManageModel)
        {
            var report = _mapper.Map<Report>(reportManageModel);

            await _reportRepository.InsertAsync(report);
            report = await GetAll().FirstOrDefaultAsync(x => x.Id == report.Id);
            return new ResponseModel()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Data = new ReportViewModel(report)
            };
        }

        public async Task<ResponseModel> ResponseReportAsync(Guid id, ReportManageModel reportManageModel)
        {
            var report = await _reportRepository.GetByIdAsync(id);
            if (report == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Report is not exist!"
                };
            }
            else
            {
                reportManageModel.GetReportFromModel(report);
                return await _reportRepository.UpdateAsync(report);
            }
        }

        public async Task<ResponseModel> DeleteReportAsync(Guid id)
        {
            return await _reportRepository.DeleteAsync(id);
        }
    }
}
