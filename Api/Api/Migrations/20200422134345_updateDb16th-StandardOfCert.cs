using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb16thStandardOfCert : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InformaticsCertificateMinimumRating",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "InformaticsCertificateReferenceContent",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireInformaticsCertificate",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireLanguageCertificate",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireNationalDefenseAndSecurityCertificate",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequirePhysicalEducationCertificate",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "LanguageCertificateMinimumRating",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "LanguageCertificateReferenceContent",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "NationalDefenseAndSecurityCertificateMinimumRating",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "NationalDefenseAndSecurityCertificateReferenceContent",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "PhysicalEducationCertificateMinimumRating",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "PhysicalEducationCertificateReferenceContent",
                table: "StandardOfCertificate");

            migrationBuilder.AddColumn<string>(
                name: "ExtracurricularPointReference",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InformaticsReference",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireExtracurricularPoint",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireInformatics",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireLanguage",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireNationalDefenseAndSecurity",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequirePhysicalEducation",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LanguageReference",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NationalDefenseAndSecurityReference",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhysicalEducationReference",
                table: "StandardOfCertificate",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtracurricularPointReference",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "InformaticsReference",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireExtracurricularPoint",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireInformatics",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireLanguage",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequireNationalDefenseAndSecurity",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "IsRequirePhysicalEducation",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "LanguageReference",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "NationalDefenseAndSecurityReference",
                table: "StandardOfCertificate");

            migrationBuilder.DropColumn(
                name: "PhysicalEducationReference",
                table: "StandardOfCertificate");

            migrationBuilder.AddColumn<string>(
                name: "InformaticsCertificateMinimumRating",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "InformaticsCertificateReferenceContent",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireInformaticsCertificate",
                table: "StandardOfCertificate",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireLanguageCertificate",
                table: "StandardOfCertificate",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequireNationalDefenseAndSecurityCertificate",
                table: "StandardOfCertificate",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequirePhysicalEducationCertificate",
                table: "StandardOfCertificate",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LanguageCertificateMinimumRating",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LanguageCertificateReferenceContent",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NationalDefenseAndSecurityCertificateMinimumRating",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NationalDefenseAndSecurityCertificateReferenceContent",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhysicalEducationCertificateMinimumRating",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhysicalEducationCertificateReferenceContent",
                table: "StandardOfCertificate",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
