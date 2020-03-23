using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updateDb14th : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Extracurricular_ExtracurricularActivities_ExtracurricularActivityId",
                table: "Extracurricular");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExtracurricularActivities",
                table: "ExtracurricularActivities");

            migrationBuilder.RenameTable(
                name: "ExtracurricularActivities",
                newName: "ExtracurricularActivity");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExtracurricularActivity",
                table: "ExtracurricularActivity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Extracurricular_ExtracurricularActivity_ExtracurricularActivityId",
                table: "Extracurricular",
                column: "ExtracurricularActivityId",
                principalTable: "ExtracurricularActivity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Extracurricular_ExtracurricularActivity_ExtracurricularActivityId",
                table: "Extracurricular");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExtracurricularActivity",
                table: "ExtracurricularActivity");

            migrationBuilder.RenameTable(
                name: "ExtracurricularActivity",
                newName: "ExtracurricularActivities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExtracurricularActivities",
                table: "ExtracurricularActivities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Extracurricular_ExtracurricularActivities_ExtracurricularActivityId",
                table: "Extracurricular",
                column: "ExtracurricularActivityId",
                principalTable: "ExtracurricularActivities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
