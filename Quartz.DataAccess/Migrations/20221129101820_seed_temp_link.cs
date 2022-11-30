using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class seed_temp_link : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "QuartzLinks",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DrawingSettingsId", "MainDrawingSettingsId", "ShowLabel", "TagNo" },
                values: new object[] { 2, "QUARTZ", new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434), 1, 1, true, "Temp" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "QuartzLinks",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
