using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.ArticleCategories
{
    public class ArticleCategoryViewModel
    {
        public ArticleCategoryViewModel()
        {

        }

        public ArticleCategoryViewModel(ArticleCategory articleCategory) : this()
        {
            if (articleCategory != null)
            {
                Id = articleCategory.Id;
                Name = articleCategory.Name;
                Description = articleCategory.Description;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
