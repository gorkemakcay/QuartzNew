using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class vw_SearchItem_added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("CREATE VIEW VW_SearchItem AS SELECT \"item\".\"Id\", \"info\".\"TagNo\", \"info\".\"SerialNo\", \"info\".\"Specification\", \"info\".\"FittingType\", \"info\".\"WeldType\", \"item\".\"IsInspected\", \"drawing\".\"DrawingNo\", \"drawing\".\"PlantArea\", \"drawing\".\"PlantSystem\", \"drawing\".\"Description\" FROM \"QuartzItems\" AS \"item\" INNER JOIN \"QuartzItemsInformations\" AS \"info\" ON (\"item\".\"Id\" = \"info\".\"QuartzItemId\") INNER JOIN \"QuartzLinksDrawingSettings\" AS \"drawing\" ON (\"item\".\"DrawingSettingsId\" = \"drawing\".\"Id\" );");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW vw_SearchItem");
        }
    }
}
