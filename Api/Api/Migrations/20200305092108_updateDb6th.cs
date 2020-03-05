using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb6th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Extracurricular_ExtracurricularPoint_ExtracurricularPointId",
                table: "Extracurricular");

            migrationBuilder.DropForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_ExtracurricularPoint_ExtracurricularPointId",
                table: "Student");

            migrationBuilder.DropTable(
                name: "ExtracurricularPoint");

            migrationBuilder.DropIndex(
                name: "IX_Student_ExtracurricularPointId",
                table: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Extracurricular",
                table: "Extracurricular");

            migrationBuilder.DropIndex(
                name: "IX_Extracurricular_ExtracurricularPointId",
                table: "Extracurricular");

            migrationBuilder.DropColumn(
                name: "ExtracurricularPointId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "ExtracurricularPointId",
                table: "Extracurricular");

            migrationBuilder.AlterColumn<Guid>(
                name: "StandardOfCertificateId",
                table: "Specialty",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StudentId",
                table: "Extracurricular",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Extracurricular",
                table: "Extracurricular",
                columns: new[] { "ExtracurricularActivityId", "StudentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Extracurricular_StudentId",
                table: "Extracurricular",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Extracurricular_Student_StudentId",
                table: "Extracurricular",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty",
                column: "StandardOfCertificateId",
                principalTable: "StandardOfCertificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Extracurricular_Student_StudentId",
                table: "Extracurricular");

            migrationBuilder.DropForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Extracurricular",
                table: "Extracurricular");

            migrationBuilder.DropIndex(
                name: "IX_Extracurricular_StudentId",
                table: "Extracurricular");

            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "Extracurricular");

            migrationBuilder.AddColumn<Guid>(
                name: "ExtracurricularPointId",
                table: "Student",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "StandardOfCertificateId",
                table: "Specialty",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "ExtracurricularPointId",
                table: "Extracurricular",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Extracurricular",
                table: "Extracurricular",
                columns: new[] { "ExtracurricularActivityId", "ExtracurricularPointId" });

            migrationBuilder.CreateTable(
                name: "ExtracurricularPoint",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    RecordActive = table.Column<bool>(type: "bit", nullable: false),
                    RecordDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RecordOrder = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtracurricularPoint", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Student_ExtracurricularPointId",
                table: "Student",
                column: "ExtracurricularPointId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Extracurricular_ExtracurricularPointId",
                table: "Extracurricular",
                column: "ExtracurricularPointId");

            migrationBuilder.AddForeignKey(
                name: "FK_Extracurricular_ExtracurricularPoint_ExtracurricularPointId",
                table: "Extracurricular",
                column: "ExtracurricularPointId",
                principalTable: "ExtracurricularPoint",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty",
                column: "StandardOfCertificateId",
                principalTable: "StandardOfCertificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_ExtracurricularPoint_ExtracurricularPointId",
                table: "Student",
                column: "ExtracurricularPointId",
                principalTable: "ExtracurricularPoint",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
