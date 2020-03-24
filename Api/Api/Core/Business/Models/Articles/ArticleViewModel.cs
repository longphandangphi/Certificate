﻿using Api.Core.Business.Models.ArticleCategories;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Articles
{
    public class ArticleViewModel
    {
        public ArticleViewModel()
        {

        }

        public ArticleViewModel(Article article) : this()
        {
            if (article != null)
            {
                Id = article.Id;
                Title = article.Title;
                Preview = article.Preview;
                Detail = article.Detail;
                Picture = article.Picture;
                ArticleCategory = new ArticleCategoryViewModel(article.ArticleCategory);
                CreateOn = article.CreatedOn.ToString("dd/MM/yyyy");
            }
        }

        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Preview { get; set; }

        public string Detail { get; set; }

        public string Picture { get; set; }

        public string CreateOn { get; set; }

        public ArticleCategoryViewModel ArticleCategory { get; set; }
    }
}
