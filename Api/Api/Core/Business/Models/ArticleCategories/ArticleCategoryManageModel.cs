using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.ArticleCategories
{
    public class ArticleCategoryManageModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public void GetArticleCategoryFromModel(ArticleCategory articleCategory)
        {
            articleCategory.Name = Name;
            articleCategory.Description = Description;
        }

        //validate trung ten 
    }
}
