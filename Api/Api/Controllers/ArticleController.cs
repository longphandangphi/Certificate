using Api.Core.Business.Filters;
using Api.Core.Business.Models.Articles;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/articles")]
    [ValidateModel]
    public class ArticleController : Controller
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var article = await _articleService.ListArticleAsync(requestListViewModel);
            return Ok(article);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticleById(Guid id)
        {
            var article = await _articleService.GetArticleByIdAsync(id);
            return Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ArticleManageModel articleManageModel)
        {
            var response = await _articleService.CreateArticleAsync(articleManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ArticleManageModel articleManageModel)
        {
            var response = await _articleService.UpdateArticleAsync(id, articleManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _articleService.DeleteArticleAsync(id);
            return new CustomActionResult(response);
        }

    }
}
