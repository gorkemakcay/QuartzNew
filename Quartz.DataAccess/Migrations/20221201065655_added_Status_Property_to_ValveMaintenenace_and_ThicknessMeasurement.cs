using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class added_Status_Property_to_ValveMaintenenace_and_ThicknessMeasurement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "QuartzItemsValveMaintenances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "QuartzItemsThicknessMeasurements",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "QuartzItemsValveMaintenances");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "QuartzItemsThicknessMeasurements");
        }
    }
}
