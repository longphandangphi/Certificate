using Api.Core.Business.Models.Articles;
using Api.Core.Business.Models.Base;
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
    public interface IArticleService
    {
        Task<PagedList<ArticleViewModel>> ListArticleAsync(RequestListViewModel requestListViewModel);
        Task<PagedList<ArticleViewModel>> ListArticleByCategoryIdAsync(Guid id, RequestListViewModel requestListViewModel);
        Task<ArticleViewModel> GetArticleByIdAsync(Guid? id);
        Task<ResponseModel> CreateArticleAsync(ArticleManageModel articleManagerModel);
        Task<ResponseModel> UpdateArticleAsync(Guid id, ArticleManageModel articleManagerModel);
        Task<ResponseModel> DeleteArticleAsync(Guid id);

    }
    public class ArticleService : IArticleService
    {
        private readonly IRepository<Article> _articleRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ArticleService(IRepository<Article> articleRepository, IMapper mapper)
        {
            _articleRepository = articleRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<Article> GetAll()
        {
            return _articleRepository.GetAll().Include(x => x.ArticleCategory);
        }

        private List<string> GetAllPropertyNameOfArticleViewModel()
        {
            var articleViewModel = new ArticleViewModel();

            var type = articleViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ArticleViewModel>> ListArticleAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Title.Contains(requestListViewModel.Query))
                    //|| (x.ArticleCategory.Id.ToString().Contains(requestListViewModel.Query))
                    ))
                .Select(x => new ArticleViewModel(x)).ToListAsync();

            var articleViewModelProperties = GetAllPropertyNameOfArticleViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = articleViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "CreateOn";
            }

            var type = typeof(ArticleViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ArticleViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<PagedList<ArticleViewModel>> ListArticleByCategoryIdAsync(Guid id, RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && x.ArticleCategory.Id.Equals(id)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    //|| (x.Title.Contains(requestListViewModel.Query))
                    //|| (x.ArticleCategory.Id.ToString().Contains(requestListViewModel.Query))
                    ))
                .Select(x => new ArticleViewModel(x)).ToListAsync();

            var articleViewModelProperties = GetAllPropertyNameOfArticleViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = articleViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

            if (string.IsNullOrEmpty(matchedPropertyName))
            {
                matchedPropertyName = "CreateOn";
            }

            var type = typeof(ArticleViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ArticleViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ArticleViewModel> GetArticleByIdAsync(Guid? id)
        {
            //var article = await _articleRepository.GetByIdAsync(id);
            var article = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ArticleViewModel(article);
        }

        public async Task<ResponseModel> CreateArticleAsync(ArticleManageModel articleManageModel)
        {
            var article = await _articleRepository.FetchFirstAsync(x => x.Title == articleManageModel.Title);
            if (article != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This Article title is exist!",
                };
            }
            else
            {
                article = _mapper.Map<Article>(articleManageModel);

                await _articleRepository.InsertAsync(article);
                article = await GetAll().FirstOrDefaultAsync(x => x.Id == article.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ArticleViewModel(article)
                };
            }
        }

        public async Task<ResponseModel> UpdateArticleAsync(Guid id, ArticleManageModel articleManageModel)
        {
            var article = await _articleRepository.GetByIdAsync(id);
            if (article == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Article is not exist!"
                };
            }
            else
            {
                var existedArticle = await _articleRepository.FetchFirstAsync(x => x.Title == articleManageModel.Title && x.Id != id);
                if (existedArticle != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This Article's title is exist!"
                    };
                }
                else
                {
                    articleManageModel.GetArticleFromModel(article);
                    return await _articleRepository.UpdateAsync(article);
                }
            }
        }

        public async Task<ResponseModel> DeleteArticleAsync(Guid id)
        {
            var article = await _articleRepository.GetByIdAsync(id);
            if (article == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This Article is not exist!"
                };
            }
            else
            {
                return await _articleRepository.DeleteAsync(id);
            }
        }
    }
}
