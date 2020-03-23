using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb11th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Article_ArticleCategory_ArticleCategoryId",
                table: "Article");

            migrationBuilder.DropColumn(
                name: "Picture",
                table: "ArticleCategory");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Article");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ArticleCategory",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ArticleCategoryId",
                table: "Article",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Article_ArticleCategory_ArticleCategoryId",
                table: "Article",
                column: "ArticleCategoryId",
                principalTable: "ArticleCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Article_ArticleCategory_ArticleCategoryId",
                table: "Article");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ArticleCategory");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "ArticleCategory",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ArticleCategoryId",
                table: "Article",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Article",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddForeignKey(
                name: "FK_Article_ArticleCategory_ArticleCategoryId",
                table: "Article",
                column: "ArticleCategoryId",
                principalTable: "ArticleCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
