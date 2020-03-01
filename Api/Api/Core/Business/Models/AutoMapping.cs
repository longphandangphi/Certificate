using Api.Core.Business.Models.Roles;
using Api.Core.Business.Models.Users;
using Api.Core.Business.Services;
using Api.Core.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

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
            CreateMap<RoleManageModel, Role>();
            CreateMap<UserRegisterModel, User>();
            CreateMap<UserLoginModel, User>();
            CreateMap<User, JwtPayload>();
            //CreateMap<ItemManageModel, Item>();
            //CreateMap<ReviewManageModel, Review>();
            //CreateMap<ItemManageModel, Item>();
            //CreateMap<ReviewManageModel, Review>();
        }
    }
}
