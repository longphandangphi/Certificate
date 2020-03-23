using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb13th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrgnizedTime",
                table: "ExtracurricularActivities");

            migrationBuilder.DropColumn(
                name: "OrgnizedUnit",
                table: "ExtracurricularActivities");

            migrationBuilder.AlterColumn<string>(
                name: "Semester",
                table: "ExtracurricularActivities",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ExtracurricularActivities",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ExpectedLocation",
                table: "ExtracurricularActivities",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrganizedTime",
                table: "ExtracurricularActivities",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OrganizedUnit",
                table: "ExtracurricularActivities",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizedTime",
                table: "ExtracurricularActivities");

            migrationBuilder.DropColumn(
                name: "OrganizedUnit",
                table: "ExtracurricularActivities");

            migrationBuilder.AlterColumn<string>(
                name: "Semester",
                table: "ExtracurricularActivities",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ExtracurricularActivities",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ExpectedLocation",
                table: "ExtracurricularActivities",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "OrgnizedTime",
                table: "ExtracurricularActivities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrgnizedUnit",
                table: "ExtracurricularActivities",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
