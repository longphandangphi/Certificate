using Api.Core.Business.IoC;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Business.Models.Articles
{
    public class ArticleManageModel : IValidatableObject
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Preview { get; set; }

        [Required]
        public string Detail { get; set; }
        
        public string Picture { get; set; }

        [Required]
        public Guid ArticleCategoryId { get; set; }

        public void GetArticleFromModel(Article article)
        {
            article.Title = Title;
            article.Preview = Preview;
            article.Detail = Detail;
            article.Picture = Picture;
            article.ArticleCategoryId = ArticleCategoryId;
        }

        // validate
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var standardOfCertificateRepository = IoCHelper.GetInstance<IRepository<ArticleCategory>>();
            var standardOfCertificate = standardOfCertificateRepository.GetAll().FirstOrDefault(x => x.Id == ArticleCategoryId);
            if (standardOfCertificate == null)
            {
                yield return new ValidationResult("ArticleCategory is not found!", new string[] { "ArticleCategoryId" });
            }
        }
    }
}
