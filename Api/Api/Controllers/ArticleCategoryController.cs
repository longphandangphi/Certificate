using Api.Core.Business.Filters;
using Api.Core.Business.Models.ArticleCategories;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/articleCategories")]
    [ValidateModel]
    public class ArticleCategoryController : Controller
    {
        private readonly IArticleCategoryService _articleCategoryService;

        public ArticleCategoryController(IArticleCategoryService articleCategoryService)
        {
            _articleCategoryService = articleCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var articleCategory = await _articleCategoryService.ListArticleCategoryAsync(requestListViewModel);
            return Ok(articleCategory);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticleCategoryById(Guid id)
        {
            var articleCategory = await _articleCategoryService.GetArticleCategoryByIdAsync(id);
            return Ok(articleCategory);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ArticleCategoryManageModel articleCategoryManageModel)
        {
            var response = await _articleCategoryService.CreateArticleCategoryAsync(articleCategoryManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ArticleCategoryManageModel articleCategoryManageModel)
        {
            var response = await _articleCategoryService.UpdateArticleCategoryAsync(id, articleCategoryManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _articleCategoryService.DeleteArticleCategoryAsync(id);
            return new CustomActionResult(response);
        }

    }
}
