using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class link_drawingsettings_drawingfeatures_tables_updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinksDrawingFeatures_QuartzLinks_QuartzLinkId",
                table: "QuartzLinksDrawingFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinksDrawingSettings_QuartzLinks_QuartzLinkId",
                table: "QuartzLinksDrawingSettings");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinksDrawingSettings_QuartzLinkId",
                table: "QuartzLinksDrawingSettings");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinksDrawingFeatures_QuartzLinkId",
                table: "QuartzLinksDrawingFeatures");

            migrationBuilder.DropColumn(
                name: "File",
                table: "QuartzLinksDrawingSettings");

            migrationBuilder.RenameColumn(
                name: "QuartzLinkId",
                table: "QuartzLinksDrawingSettings",
                newName: "CurrentDrawingId");

            migrationBuilder.RenameColumn(
                name: "QuartzLinkId",
                table: "QuartzLinksDrawingFeatures",
                newName: "DrawingSettingsId");

            migrationBuilder.RenameColumn(
                name: "CurrentDrawingId",
                table: "QuartzLinks",
                newName: "DrawingSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinksDrawingFeatures_DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures",
                column: "DrawingSettingsId",
                unique: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzLinksDrawingFeatures_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures",
                column: "DrawingSettingsId",
                principalTable: "QuartzLinksDrawingSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinks_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.DropForeignKey(
                name: "FK_QuartzLinksDrawingFeatures_QuartzLinksDrawingSettings_DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinksDrawingFeatures_DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures");

            migrationBuilder.DropIndex(
                name: "IX_QuartzLinks_DrawingSettingsId",
                table: "QuartzLinks");

            migrationBuilder.RenameColumn(
                name: "CurrentDrawingId",
                table: "QuartzLinksDrawingSettings",
                newName: "QuartzLinkId");

            migrationBuilder.RenameColumn(
                name: "DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures",
                newName: "QuartzLinkId");

            migrationBuilder.RenameColumn(
                name: "DrawingSettingsId",
                table: "QuartzLinks",
                newName: "CurrentDrawingId");

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "QuartzLinksDrawingSettings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinksDrawingSettings_QuartzLinkId",
                table: "QuartzLinksDrawingSettings",
                column: "QuartzLinkId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinksDrawingFeatures_QuartzLinkId",
                table: "QuartzLinksDrawingFeatures",
                column: "QuartzLinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzLinksDrawingFeatures_QuartzLinks_QuartzLinkId",
                table: "QuartzLinksDrawingFeatures",
                column: "QuartzLinkId",
                principalTable: "QuartzLinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuartzLinksDrawingSettings_QuartzLinks_QuartzLinkId",
                table: "QuartzLinksDrawingSettings",
                column: "QuartzLinkId",
                principalTable: "QuartzLinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
