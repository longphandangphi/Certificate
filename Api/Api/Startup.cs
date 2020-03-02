using System.Collections.Generic;
using System.Linq;
using Api.Core.Business.Filters;
using Api.Core.Business.IoC;
using Api.Core.Business.Models;
using Api.Core.Business.Services;
using Api.Core.Common.Constants;
using Api.Core.Common.Extentions;
using Api.Core.Common.Helpers;
using Api.Core.Common.Utilities;
using Api.Core.DataAccess.Repository;
using Api.Core.DataAccess.Repository.Base;
using Api.Core.Entities;
using Api.Core.Entities.Enums;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Serilog;
using Serilog.Extensions.Logging;

namespace Api
{
    public class Startup
    {
        public static IConfigurationRoot Configuration;
        public Startup(IHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();


            var logPath = Configuration["AppSettings:LoggingPath"] + "Orient-{Date}-" + System.Environment.MachineName + ".txt";
            Log.Logger = new LoggerConfiguration()
              .MinimumLevel.Warning()
              .WriteTo.RollingFile(logPath, retainedFileCountLimit: 15)
              .CreateLogger();
        }

        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.AddControllers();
            services.AddSingleton(Configuration);
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSerilog(dispose: true);
                loggingBuilder.SetMinimumLevel(LogLevel.Information);
                loggingBuilder.AddFilter<SerilogLoggerProvider>(null, LogLevel.Trace);
            });
            services.AddSingleton<ILoggerProvider, SerilogLoggerProvider>();

            string conn = Configuration.GetConnectionString("certificate");
            services.AddDbContextPool<CertificateDbContext>(options => options.UseSqlServer(conn));

            //Config AutoMapper
            services.AddAutoMapper(typeof(Startup));

            //Register JwtHelper
            services.AddScoped<IJwtHelper, JwtHelper>();

            //Register Services
            //services.AddScoped<IMenuService, MenuService>();
            //services.AddScoped<IBookingService, BookingService>();
            //services.AddScoped<IPromotionService, PromotionService>();
            //services.AddScoped<ITableService, TableService>();
            //services.AddScoped<IOrderService, OrderService>();
            //services.AddScoped<IOrderDetailService, OrderDetailService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IFacultyService, FacultyService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ISSOAuthService, SSOAuthService>();
            services.AddScoped<IMajorService, MajorService>();
            //services.AddScoped<IItemService, ItemService>();
            //services.AddScoped<IReviewService, ReviewService>();
            //services.AddScoped<IItemService, ItemService>();
            //services.AddScoped<IReviewService, ReviewService>();

            //Register Repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            IoCHelper.SetServiceProvider(services.BuildServiceProvider());

            services.AddMvc(option =>
            {
                option.Filters.Add<HandleExceptionFilterAttribute>();
            });

            //Swagger
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo { Title = "Certificate API", Version = "v1" });
                x.DescribeAllParametersInCamelCase();
                x.OperationFilter<AccessTokenHeaderParameterOperationFilter>();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            // Auto run migration
            RunMigration(app);

            // Initialize Data
            InitDataRole();
            InitUserAdmin();
            InitSampleUser();
        }

        private void RunMigration(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<CertificateDbContext>().Database.Migrate();
            }
        }

        private void InitDataRole()
        {
            var roleRepository = IoCHelper.GetInstance<IRepository<Role>>();

            var roles = new[]
            {
                new Role {
                    Id = RoleConstants.SuperAdminId,
                    Name = "Super Admin"
                },
                new Role {
                    Id = RoleConstants.CashierId,
                    Name = "Cashier"
                },
                new Role {
                    Id = RoleConstants.WaiterId,
                    Name = "Waiter"
                },
                new Role {
                    Id = RoleConstants.ChefId,
                    Name = "Chef"
                }
            };

            roleRepository.GetDbContext().Roles.AddIfNotExist(x => x.Name, roles);
            roleRepository.GetDbContext().SaveChanges();
        }

        private void InitUserAdmin()
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            if (userRepository.GetAll().Count() > 0)
            {
                return;// It's already init
            }

            var user = new User();
            user.Username = "phungdinh";
            user.FullName = "Super Admin";
            user.Email = "phung.dinh@orientsoftware.com";


            var password = "orient@123";
            password.GeneratePassword(out string saltKey, out string hashPass);

            user.Password = hashPass;
            user.PasswordSalt = saltKey;
            user.Gender = UserEnums.Gender.Male;

            user.UserInRoles = new List<UserInRole>()
                    {
                        new UserInRole()
                        {
                            UserId = UserConstants.SuperAdminUserId,
                            RoleId = RoleConstants.SuperAdminId
                        }
                    };

            var users = new[]
            {
                user
            };

            userRepository.GetDbContext().Users.AddIfNotExist(x => x.FullName, users);
            userRepository.GetDbContext().SaveChanges();
        }

        private void InitSampleUser()
        {
            var userRepository = IoCHelper.GetInstance<IRepository<User>>();
            if (userRepository.GetAll().Count() > 1)
            {
                return;// It's already init sample user
            }

            var user = new User();
            user.Username = "longphan";
            user.FullName = "Sample User";
            user.Email = "long.phan@orientsoftware.com";

            var password = "orient@123";
            password.GeneratePassword(out string saltKey, out string hashPass);

            user.Password = hashPass;
            user.PasswordSalt = saltKey;
            user.Gender = UserEnums.Gender.Male;

            user.UserInRoles = new List<UserInRole>()
                    {
                        new UserInRole()
                        {
                            UserId = UserConstants.SuperAdminUserId,
                            RoleId = RoleConstants.WaiterId
                        },
                        new UserInRole()
                        {
                            UserId = UserConstants.SuperAdminUserId,
                            RoleId = RoleConstants.CashierId
                        }
                    };

            var users = new[]
            {
                user
            };

            userRepository.GetDbContext().Users.AddIfNotExist(x => x.FullName, users);
            userRepository.GetDbContext().SaveChanges();
        }
    }
}
