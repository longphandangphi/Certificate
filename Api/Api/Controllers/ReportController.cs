using Api.Core.Business.Filters;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Reports;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/reports")]
    [ValidateModel]
    public class ReportController : Controller
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var report = await _reportService.ListReportAsync(requestListViewModel);
            return Ok(report);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReportById(Guid id)
        {
            var report = await _reportService.GetReportByIdAsync(id);
            return Ok(report);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ReportManageModel reportManageModel)
        {
            var response = await _reportService.CreateReportAsync(reportManageModel);
            return new CustomActionResult(response);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> Update(Guid id, [FromBody] ReportManageModel reportManageModel)
        //{
        //    var response = await _reportService.UpdateReportAsync(id, reportManageModel);
        //    return new CustomActionResult(response);
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _reportService.DeleteReportAsync(id);
            return new CustomActionResult(response);
        }

    }
}
