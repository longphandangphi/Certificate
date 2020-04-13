using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb15th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSeen",
                table: "Report");

            migrationBuilder.DropColumn(
                name: "IsSolved",
                table: "Report");

            migrationBuilder.AddColumn<string>(
                name: "Response",
                table: "Report",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Response",
                table: "Report");

            migrationBuilder.AddColumn<bool>(
                name: "IsSeen",
                table: "Report",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSolved",
                table: "Report",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
