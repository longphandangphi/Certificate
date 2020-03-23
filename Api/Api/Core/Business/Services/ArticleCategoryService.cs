using Api.Core.Business.Models.ArticleCategories;
using Api.Core.Business.Models.Base;
using Api.Core.Business.Models.Faculties;
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
    public interface IArticleCategoryService
    {
        //xem thêm sửa xóa
        Task<PagedList<ArticleCategoryViewModel>> ListArticleCategoryAsync(RequestListViewModel requestListViewModel);
        Task<ArticleCategoryViewModel> GetArticleCategoryByIdAsync(Guid? id);
        Task<ResponseModel> CreateArticleCategoryAsync(ArticleCategoryManageModel articleCategoryManagerModel);
        Task<ResponseModel> UpdateArticleCategoryAsync(Guid id, ArticleCategoryManageModel articleCategoryManagerModel);
        Task<ResponseModel> DeleteArticleCategoryAsync(Guid id);

    }
    public class ArticleCategoryService : IArticleCategoryService
    {
        private readonly IRepository<ArticleCategory> _articleCategoryRepository;
        private readonly IMapper _mapper;

        #region constructor

        public ArticleCategoryService(IRepository<ArticleCategory> articleCategoryRepository, IMapper mapper)
        {
            _articleCategoryRepository = articleCategoryRepository;
            _mapper = mapper;
        }

        #endregion

        #region private method
        private IQueryable<ArticleCategory> GetAll()
        {
            return _articleCategoryRepository.GetAll();
        }
        
        private List<string> GetAllPropertyNameOfArticleCategoryViewModel()
        {
            var articleCategoryViewModel = new ArticleCategoryViewModel();

            var type = articleCategoryViewModel.GetType();

            return ReflectionUtilities.GetAllPropertyNamesOfType(type);
        }
        #endregion

        public async Task<PagedList<ArticleCategoryViewModel>> ListArticleCategoryAsync(RequestListViewModel requestListViewModel)
        {
            var list = await GetAll()
                .Where(x => (!requestListViewModel.IsActive.HasValue || x.RecordActive == requestListViewModel.IsActive)
                && (string.IsNullOrEmpty(requestListViewModel.Query)
                    || (x.Name.Contains(requestListViewModel.Query)
                    )))
                .Select(x => new ArticleCategoryViewModel(x)).ToListAsync();

            var articleCategoryViewModelProperties = GetAllPropertyNameOfArticleCategoryViewModel();

            var requestPropertyName = !string.IsNullOrEmpty(requestListViewModel.SortName) ? requestListViewModel.SortName.ToLower() : string.Empty;

            string matchedPropertyName = articleCategoryViewModelProperties.FirstOrDefault(x => x == requestPropertyName);

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

            var type = typeof(ArticleCategoryViewModel);

            var sortProperty = type.GetProperty(matchedPropertyName);

            list = requestListViewModel.IsDesc ? list.OrderByDescending(x => sortProperty.GetValue(x, null)).ToList() : list.OrderBy(x => sortProperty.GetValue(x, null)).ToList();

            return new PagedList<ArticleCategoryViewModel>(list, requestListViewModel.Offset ?? CommonConstants.Config.DEFAULT_SKIP, requestListViewModel.Limit ?? CommonConstants.Config.DEFAULT_TAKE);
        }

        public async Task<ArticleCategoryViewModel> GetArticleCategoryByIdAsync(Guid? id)
        {
            var articleCategory = await _articleCategoryRepository.GetByIdAsync(id);
            //var user = await GetAll().FirstOrDefaultAsync(x => x.Id == id);
            return new ArticleCategoryViewModel(articleCategory);
        }

        public async Task<ResponseModel> CreateArticleCategoryAsync(ArticleCategoryManageModel articleCategoryManageModel)
        {
            var articleCategory = await _articleCategoryRepository.FetchFirstAsync(x => x.Name == articleCategoryManageModel.Name);
            if (articleCategory != null)
            {
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.BadRequest,
                    Message = "This ArticleCategory's name is exist!",
                };
            }
            else
            {
                //var menu = await _menuResponstory.GetByIdAsync(itemManageModel.MenuId);
                articleCategory = _mapper.Map<ArticleCategory>(articleCategoryManageModel);
                //item.Menu = menu;

                await _articleCategoryRepository.InsertAsync(articleCategory);
                articleCategory = await GetAll().FirstOrDefaultAsync(x => x.Id == articleCategory.Id);
                return new ResponseModel()
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = new ArticleCategoryViewModel(articleCategory)
                };
            }
        }

        public async Task<ResponseModel> UpdateArticleCategoryAsync(Guid id, ArticleCategoryManageModel articleCategoryManageModel)
        {
            var articleCategory = await _articleCategoryRepository.GetByIdAsync(id);
            if (articleCategory == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This ArticleCategory is not exist!"
                };
            }
            else
            {
                var existedArticleCategory = await _articleCategoryRepository.FetchFirstAsync(x => x.Name == articleCategoryManageModel.Name);
                if (existedArticleCategory != null)
                {
                    return new ResponseModel
                    {
                        StatusCode = System.Net.HttpStatusCode.BadRequest,
                        Message = "This ArticleCategory's name is exist!"
                    };
                }
                else
                {
                    articleCategoryManageModel.GetArticleCategoryFromModel(articleCategory);
                    return await _articleCategoryRepository.UpdateAsync(articleCategory);
                }
            }
        }

        public async Task<ResponseModel> DeleteArticleCategoryAsync(Guid id)
        {
            var articleCategory = await _articleCategoryRepository.GetByIdAsync(id);
            if (articleCategory == null)
            {
                return new ResponseModel
                {
                    StatusCode = System.Net.HttpStatusCode.NotFound,
                    Message = "This ArticleCategory is not exist!"
                };
            }
            else
            {
                return await _articleCategoryRepository.DeleteAsync(id);
            }
        }
    }
}
