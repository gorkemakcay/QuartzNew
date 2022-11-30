using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class link_and_item_update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzItems_QuartzLinks_QuartzLinkId",
                table: "QuartzItems");

            migrationBuilder.RenameColumn(
                name: "MainQuartzLinkId",
                table: "QuartzLinks",
                newName: "MainDrawingSettingsId");

            migrationBuilder.RenameColumn(
                name: "QuartzLinkId",
                table: "QuartzItems",
                newName: "DrawingSettingsId");

            migrationBuilder.RenameIndex(
                name: "IX_QuartzItems_QuartzLinkId",
                table: "QuartzItems",
                newName: "IX_QuartzItems_DrawingSettingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzItems_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzItems",
                column: "DrawingSettingsId",
                principalTable: "QuartzLinksDrawingSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzItems_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzItems");

            migrationBuilder.RenameColumn(
                name: "MainDrawingSettingsId",
                table: "QuartzLinks",
                newName: "MainQuartzLinkId");

            migrationBuilder.RenameColumn(
                name: "DrawingSettingsId",
                table: "QuartzItems",
                newName: "QuartzLinkId");

            migrationBuilder.RenameIndex(
                name: "IX_QuartzItems_DrawingSettingsId",
                table: "QuartzItems",
                newName: "IX_QuartzItems_QuartzLinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzItems_QuartzLinks_QuartzLinkId",
                table: "QuartzItems",
                column: "QuartzLinkId",
                principalTable: "QuartzLinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
