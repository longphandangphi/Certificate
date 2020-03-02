using Api.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.DataAccess.Repository
{
    public class CertificateDbContext : DbContext
    {
        public CertificateDbContext(DbContextOptions<CertificateDbContext> options) : base(options)
        {

        }

        public DbSet<Article> Articles { get; set; }

        public DbSet<ArticleCategory> ArticleCategories { get; set; }

        public DbSet<CertificateStatus> CertificateStatuses { get; set; }

        public DbSet<Class> Classes { get; set; }

        public DbSet<Extracurricular> Extracurriculars { get; set; }

        public DbSet<ExtracurricularActivity> ExtracurricularActivities { get; set; }

        public DbSet<ExtracurricularPoint> ExtracurricularPoints { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Major> Majors { get; set; }

        public DbSet<Report> Reports { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Specialty> Specialties { get; set; }

        public DbSet<StandardOfCertificate> StandardOfCertificates { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserInRole> UserInRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInRole>().HasKey(t => new { t.UserId, t.RoleId });
            modelBuilder.Entity<UserInRole>()
                .HasOne(pt => pt.User)
                .WithMany(p => p.UserInRoles)
                .HasForeignKey(pt => pt.UserId);
            modelBuilder.Entity<UserInRole>()
                .HasOne(pt => pt.Role)
                .WithMany(p => p.UserInRoles)
                .HasForeignKey(pt => pt.RoleId);

            modelBuilder.Entity<Extracurricular>().HasKey(t => new { t.ExtracurricularActivityId, t.ExtracurricularPointId });
            modelBuilder.Entity<Extracurricular>()
                .HasOne(pt => pt.ExtracurricularActivity)
                .WithMany(p => p.Extracurriculars)
                .HasForeignKey(pt => pt.ExtracurricularActivityId);
            modelBuilder.Entity<Extracurricular>()
                .HasOne(pt => pt.ExtracurricularPoint)
                .WithMany(p => p.Extracurriculars)
                .HasForeignKey(pt => pt.ExtracurricularPointId);
        }
    }
}
