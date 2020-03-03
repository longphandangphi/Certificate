using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb5th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty");

            migrationBuilder.AlterColumn<Guid>(
                name: "StandardOfCertificateId",
                table: "Specialty",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty",
                column: "StandardOfCertificateId",
                principalTable: "StandardOfCertificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty");

            migrationBuilder.AlterColumn<Guid>(
                name: "StandardOfCertificateId",
                table: "Specialty",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialty_StandardOfCertificate_StandardOfCertificateId",
                table: "Specialty",
                column: "StandardOfCertificateId",
                principalTable: "StandardOfCertificate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
