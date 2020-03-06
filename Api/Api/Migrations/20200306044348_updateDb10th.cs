using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb10th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsChecked",
                table: "Report");

            migrationBuilder.AddColumn<bool>(
                name: "IsSolved",
                table: "Report",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSolved",
                table: "Report");

            migrationBuilder.AddColumn<bool>(
                name: "IsChecked",
                table: "Report",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
