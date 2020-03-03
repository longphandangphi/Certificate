﻿// <auto-generated />
using System;
using Api.Core.DataAccess.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Api.Migrations
{
    [DbContext(typeof(CertificateDbContext))]
    partial class CertificateDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.Core.Entities.Article", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ArticleCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Detail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Preview")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("ArticleCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Article");
                });

            modelBuilder.Entity("Api.Core.Entities.ArticleCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ArticleCategory");
                });

            modelBuilder.Entity("Api.Core.Entities.CertificateStatus", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("InformaticsCertificateStatus")
                        .HasColumnType("bit");

                    b.Property<bool>("LanguageCertificateStatus")
                        .HasColumnType("bit");

                    b.Property<bool>("NationalDefenseAndSecurityCertificateStatus")
                        .HasColumnType("bit");

                    b.Property<bool>("PhysicalEducationCertificateStatus")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("CertificateStatus");
                });

            modelBuilder.Entity("Api.Core.Entities.Class", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FacultyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("FacultyId");

                    b.ToTable("Class");
                });

            modelBuilder.Entity("Api.Core.Entities.Extracurricular", b =>
                {
                    b.Property<Guid>("ExtracurricularActivityId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ExtracurricularPointId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("ExtracurricularActivityId", "ExtracurricularPointId");

                    b.HasIndex("ExtracurricularPointId");

                    b.ToTable("Extracurricular");
                });

            modelBuilder.Entity("Api.Core.Entities.ExtracurricularActivity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("ExpectedLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrgnizedTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrgnizedUnit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<string>("Semester")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ExtracurricularActivities");
                });

            modelBuilder.Entity("Api.Core.Entities.ExtracurricularPoint", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("ExtracurricularPoint");
                });

            modelBuilder.Entity("Api.Core.Entities.Faculty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Faculty");
                });

            modelBuilder.Entity("Api.Core.Entities.Major", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Major");
                });

            modelBuilder.Entity("Api.Core.Entities.Report", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsChecked")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid>("StudentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.ToTable("Report");
                });

            modelBuilder.Entity("Api.Core.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Api.Core.Entities.Specialty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("MajorId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("StandardOfCertificateId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("MajorId");

                    b.HasIndex("StandardOfCertificateId");

                    b.ToTable("Specialty");
                });

            modelBuilder.Entity("Api.Core.Entities.StandardOfCertificate", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("InformaticsCertificateMinimumRating")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InformaticsCertificateReferenceContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsRequireInformaticsCertificate")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRequireLanguageCertificate")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRequireNationalDefenseAndSecurityCertificate")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRequirePhysicalEducationCertificate")
                        .HasColumnType("bit");

                    b.Property<string>("LanguageCertificateMinimumRating")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LanguageCertificateReferenceContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NationalDefenseAndSecurityCertificateMinimumRating")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NationalDefenseAndSecurityCertificateReferenceContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhysicalEducationCertificateMinimumRating")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhysicalEducationCertificateReferenceContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("StandardOfCertificate");
                });

            modelBuilder.Entity("Api.Core.Entities.Student", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CertificateStatusId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ClassId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ExtracurricularPointId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Photo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfBirth")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid>("SpecialtyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CertificateStatusId")
                        .IsUnique();

                    b.HasIndex("ClassId");

                    b.HasIndex("ExtracurricularPointId")
                        .IsUnique();

                    b.HasIndex("SpecialtyId");

                    b.ToTable("Student");
                });

            modelBuilder.Entity("Api.Core.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("nvarchar(512)")
                        .HasMaxLength(512);

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ResetPasswordExpiryDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Api.Core.Entities.UserInRole", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CreatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("DeletedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("DeletedOn")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("RecordActive")
                        .HasColumnType("bit");

                    b.Property<bool>("RecordDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("RecordOrder")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdatedBy")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserInRole");
                });

            modelBuilder.Entity("Api.Core.Entities.Article", b =>
                {
                    b.HasOne("Api.Core.Entities.ArticleCategory", "ArticleCategory")
                        .WithMany("Articles")
                        .HasForeignKey("ArticleCategoryId");

                    b.HasOne("Api.Core.Entities.User", null)
                        .WithMany("Articles")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Api.Core.Entities.Class", b =>
                {
                    b.HasOne("Api.Core.Entities.Faculty", "Faculty")
                        .WithMany("MyProperty")
                        .HasForeignKey("FacultyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.Core.Entities.Extracurricular", b =>
                {
                    b.HasOne("Api.Core.Entities.ExtracurricularActivity", "ExtracurricularActivity")
                        .WithMany("Extracurriculars")
                        .HasForeignKey("ExtracurricularActivityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.ExtracurricularPoint", "ExtracurricularPoint")
                        .WithMany("Extracurriculars")
                        .HasForeignKey("ExtracurricularPointId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.Core.Entities.Report", b =>
                {
                    b.HasOne("Api.Core.Entities.Student", "Student")
                        .WithMany("Reports")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.Core.Entities.Specialty", b =>
                {
                    b.HasOne("Api.Core.Entities.Major", "Major")
                        .WithMany("Specialties")
                        .HasForeignKey("MajorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.StandardOfCertificate", "StandardOfCertificate")
                        .WithMany("Specialty")
                        .HasForeignKey("StandardOfCertificateId");
                });

            modelBuilder.Entity("Api.Core.Entities.Student", b =>
                {
                    b.HasOne("Api.Core.Entities.CertificateStatus", "CertificateStatus")
                        .WithOne("Student")
                        .HasForeignKey("Api.Core.Entities.Student", "CertificateStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.Class", "Class")
                        .WithMany("Students")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.ExtracurricularPoint", "ExtracurricularPoint")
                        .WithOne("Student")
                        .HasForeignKey("Api.Core.Entities.Student", "ExtracurricularPointId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.Specialty", "Specialty")
                        .WithMany("Students")
                        .HasForeignKey("SpecialtyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.Core.Entities.UserInRole", b =>
                {
                    b.HasOne("Api.Core.Entities.Role", "Role")
                        .WithMany("UserInRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entities.User", "User")
                        .WithMany("UserInRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
