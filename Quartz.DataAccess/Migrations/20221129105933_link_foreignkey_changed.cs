using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class link_foreignkey_changed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinks_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinks_DrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinks_MainDrawingSettingsId",
                table: "QuartzLinks",
                column: "MainDrawingSettingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzLinks_QuartzLinksDrawingSettings_MainDrawingSettingsId",
                table: "QuartzLinks",
                column: "MainDrawingSettingsId",
                principalTable: "QuartzLinksDrawingSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinks_QuartzLinksDrawingSettings_MainDrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinks_MainDrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinks_DrawingSettingsId",
                table: "QuartzLinks",
                column: "DrawingSettingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzLinks_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzLinks",
                column: "DrawingSettingsId",
                principalTable: "QuartzLinksDrawingSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
