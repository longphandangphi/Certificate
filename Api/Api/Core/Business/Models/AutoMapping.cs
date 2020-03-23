using Api.Core.Business.Models.ArticleCategories;
using Api.Core.Business.Models.Articles;
using Api.Core.Business.Models.Classes;
using Api.Core.Business.Models.ExtracurricularActivities;
using Api.Core.Business.Models.Extracurriculars;
using Api.Core.Business.Models.Faculties;
using Api.Core.Business.Models.Majors;
using Api.Core.Business.Models.Reports;
using Api.Core.Business.Models.Roles;
using Api.Core.Business.Models.Specialties;
using Api.Core.Business.Models.StandardOfCertificates;
using Api.Core.Business.Models.Students;
using Api.Core.Business.Models.Users;
using Api.Core.Entities;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;

namespace Api.Core.Business.Models
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            //CreateMap<MenuManageModel, Menu>();
            //CreateMap<BookingManageModel, Booking>();
            //CreateMap<PromotionManageModel, Promotion>();
            //CreateMap<TableManageModel, Table>();
            //CreateMap<OrderManageModel, Order>();
            //CreateMap<OrderDetailManageModel, Api.Core.Entities.OrderDetail>();
            CreateMap<ArticleManageModel, Article>();
            CreateMap<ArticleCategoryManageModel, ArticleCategory>();
            CreateMap<ClassManageModel, Class>();
            CreateMap<RoleManageModel, Role>();
            CreateMap<UserRegisterModel, User>();
            CreateMap<UserLoginModel, User>();
            CreateMap<User, JwtPayload>();
            CreateMap<FacultyManageModel, Faculty>();
            CreateMap<MajorManageModel, Major>();
            CreateMap<ExtracurricularActivityManageModel, ExtracurricularActivity>();
            CreateMap<ExtracurricularManageModel, Extracurricular>();
            CreateMap<SpecialtyManageModel, Specialty>();
            CreateMap<StandardOfCertificateManageModel, StandardOfCertificate>();
            CreateMap<StudentRegisterModel, Student>();
            CreateMap<ReportManageModel, Report>();
            //CreateMap<ItemManageModel, Item>();
            //CreateMap<ReviewManageModel, Review>();
            //CreateMap<ItemManageModel, Item>();
            //CreateMap<ReviewManageModel, Review>();
        }
    }
}
