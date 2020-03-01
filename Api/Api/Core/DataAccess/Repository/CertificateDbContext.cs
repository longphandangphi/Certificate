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

        //public DbSet<Booking> Bookings { get; set; }

        //public DbSet<Item> Items { get; set; }

        //public DbSet<Menu> Menus { get; set; }

        //public DbSet<Order> Orders { get; set; }

        //public DbSet<OrderDetail> OrderDetails { get; set; }

        //public DbSet<Promotion> Promotions { get; set; }

        //public DbSet<Review> Reviews { get; set; }

        public DbSet<Role> Roles { get; set; }

        //public DbSet<Table> Tables { get; set; }

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
        }
    }
}
