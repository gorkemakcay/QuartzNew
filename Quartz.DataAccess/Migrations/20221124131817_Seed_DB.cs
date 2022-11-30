using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Quartz.DataAccess.Migrations
{
    public partial class Seed_DB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 1, "707b717a-d330-450f-a42c-9f2b7fcdfea1", "Admin", "ADMIN" },
                    { 2, "6eadcc3d-21a3-41b8-91bd-26988bb8d656", "Operator", "OPERATOR" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "FullName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { 1, 0, "fe13649b-6a19-4964-8db8-1332ba224904", "admin@quartz.com", false, "Admin", "Admin Quartz", "Quartz", true, null, "ADMIN@QUARTZ.COM", "ADMIN", "AQAAAAEAACcQAAAAECnTVUK/QxKYvnJiVDztpm9YuvXVCbwiW86jvTxkNOXv/27Nzr1OVjy4hbtRdcoZjg==", null, false, "a3635eb1-112c-4cca-9e6e-b81e636d99c2", false, "admin" });

            migrationBuilder.InsertData(
                table: "FileUploads",
                columns: new[] { "Id", "CreatedDate", "Extension", "Name", "Path", "Type", "UploadedBy" },
                values: new object[] { 1, new DateTime(2022, 11, 24, 11, 40, 23, 645, DateTimeKind.Local).AddTicks(4467), ".jpg", "MainDrawing", "wwwroot\\Files\\MainDrawing.jpg", "image/jpeg", "QUARTZ" });

            migrationBuilder.InsertData(
                table: "QuartzLinksDrawingSettings",
                columns: new[] { "Id", "AttachmentIds", "CurrentDrawingId", "Description", "DrawingNo", "PlantArea", "PlantSystem" },
                values: new object[,]
                {
                    { 1, null, 1, null, "General", null, null },
                    { 2, null, 1, null, "Main", "select", "select" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "QuartzLinks",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DrawingSettingsId", "MainDrawingSettingsId", "ShowLabel", "TagNo" },
                values: new object[] { 1, "QUARTZ", new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434), 2, 1, true, "Main" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "FileUploads",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "QuartzLinks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "QuartzLinksDrawingSettings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "QuartzLinksDrawingSettings",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
