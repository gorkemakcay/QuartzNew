using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class added_vw_SearchItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("CREATE VIEW vw_SearchItem AS SELECT QuartzItems.Id, QuartzItemsInformations.TagNo, QuartzItemsInformations.SerialNo, QuartzItemsInformations.Specification, QuartzItemsInformations.FittingType, QuartzItemsInformations.WeldType, QuartzItems.IsInspected, QuartzLinksDrawingSettings.DrawingNo, QuartzLinksDrawingSettings.PlantArea, QuartzLinksDrawingSettings.PlantSystem, QuartzLinksDrawingSettings.Description FROM QuartzItems INNER JOIN QuartzItemsInformations ON QuartzItems.Id = QuartzItemsInformations.QuartzItemId INNER JOIN QuartzLinksDrawingSettings ON QuartzItems.DrawingSettingsId = QuartzLinksDrawingSettings.Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW vw_SearchItem");
        }
    }
}
