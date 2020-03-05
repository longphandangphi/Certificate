using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb9th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_CertificateStatus_CertificateStatusId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_CertificateStatusId",
                table: "Student");

            migrationBuilder.AlterColumn<Guid>(
                name: "CertificateStatusId",
                table: "Student",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Student_CertificateStatusId",
                table: "Student",
                column: "CertificateStatusId",
                unique: true,
                filter: "[CertificateStatusId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_CertificateStatus_CertificateStatusId",
                table: "Student",
                column: "CertificateStatusId",
                principalTable: "CertificateStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_CertificateStatus_CertificateStatusId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_CertificateStatusId",
                table: "Student");

            migrationBuilder.AlterColumn<Guid>(
                name: "CertificateStatusId",
                table: "Student",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Student_CertificateStatusId",
                table: "Student",
                column: "CertificateStatusId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Student_CertificateStatus_CertificateStatusId",
                table: "Student",
                column: "CertificateStatusId",
                principalTable: "CertificateStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
