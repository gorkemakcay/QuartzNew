using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Quartz.DataAccess.Migrations
{
    public partial class postgresql : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    FullName = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileUploads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Extension = table.Column<string>(type: "text", nullable: true),
                    Path = table.Column<string>(type: "text", nullable: true),
                    UploadedBy = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileUploads", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsComponentTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsComponentTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsFittingTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsFittingTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsOperators",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsOperators", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsPlantAreas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsPlantAreas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsPlantSystems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    LookUpItemsPlantAreas = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsPlantSystems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsProcedures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    LookUpItemsMethod = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsProcedures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsSpecifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsSpecifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsStandardStatements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsStandardStatements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsTechniques",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    LookUpItemsProcedure = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsTechniques", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupItemsWeldTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupItemsWeldTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuartzLinksDrawingSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DrawingNo = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CurrentDrawingId = table.Column<int>(type: "integer", nullable: false),
                    PlantArea = table.Column<string>(type: "text", nullable: true),
                    PlantSystem = table.Column<string>(type: "text", nullable: true),
                    AttachmentIds = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzLinksDrawingSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagNo = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    ShowLabel = table.Column<bool>(type: "boolean", nullable: false),
                    IsInspected = table.Column<int>(type: "integer", nullable: false),
                    AttachmentIds = table.Column<string>(type: "text", nullable: true),
                    DrawingSettingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzItems_QuartzLinksDrawingSettings_DrawingSettingsId",
                        column: x => x.DrawingSettingsId,
                        principalTable: "QuartzLinksDrawingSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagNo = table.Column<string>(type: "text", nullable: true),
                    ShowLabel = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: true),
                    DrawingSettingsId = table.Column<int>(type: "integer", nullable: false),
                    MainDrawingSettingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzLinks_QuartzLinksDrawingSettings_MainDrawingSettingsId",
                        column: x => x.MainDrawingSettingsId,
                        principalTable: "QuartzLinksDrawingSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzLinksDrawingFeatures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Features = table.Column<string>(type: "text", nullable: true),
                    DrawingSettingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzLinksDrawingFeatures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzLinksDrawingFeatures_QuartzLinksDrawingSettings_Drawi~",
                        column: x => x.DrawingSettingsId,
                        principalTable: "QuartzLinksDrawingSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzItemsInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagNo = table.Column<string>(type: "text", nullable: true),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    ComponentType = table.Column<string>(type: "text", nullable: true),
                    Comments = table.Column<string>(type: "text", nullable: true),
                    Specification = table.Column<string>(type: "text", nullable: true),
                    FittingType = table.Column<string>(type: "text", nullable: true),
                    WeldType = table.Column<string>(type: "text", nullable: true),
                    ShowLabel = table.Column<bool>(type: "boolean", nullable: true),
                    PipeOdIn = table.Column<float>(type: "real", nullable: true),
                    PipeThicknessMm = table.Column<float>(type: "real", nullable: true),
                    OperatingTempC = table.Column<float>(type: "real", nullable: true),
                    OperatingPressureBar = table.Column<float>(type: "real", nullable: true),
                    QuartzItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzItemsInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzItemsInformations_QuartzItems_QuartzItemId",
                        column: x => x.QuartzItemId,
                        principalTable: "QuartzItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzItemsInspections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ReportNo = table.Column<string>(type: "text", nullable: true),
                    Method = table.Column<string>(type: "text", nullable: true),
                    Procedure = table.Column<string>(type: "text", nullable: true),
                    Technique = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Details = table.Column<string>(type: "text", nullable: true),
                    AttachmentIds = table.Column<string>(type: "text", nullable: true),
                    QuartzItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzItemsInspections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzItemsInspections_QuartzItems_QuartzItemId",
                        column: x => x.QuartzItemId,
                        principalTable: "QuartzItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzItemsThicknessMeasurements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantArea = table.Column<string>(type: "text", nullable: true),
                    PlantSystem = table.Column<string>(type: "text", nullable: true),
                    Specification = table.Column<string>(type: "text", nullable: true),
                    NominalThickness = table.Column<float>(type: "real", nullable: false),
                    MeasuredThickness = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AttachmentIds = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    QuartzItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzItemsThicknessMeasurements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzItemsThicknessMeasurements_QuartzItems_QuartzItemId",
                        column: x => x.QuartzItemId,
                        principalTable: "QuartzItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuartzItemsValveMaintenances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlantArea = table.Column<string>(type: "text", nullable: true),
                    KKSNo = table.Column<string>(type: "text", nullable: true),
                    SerialNo = table.Column<string>(type: "text", nullable: true),
                    SupplierManufacturare = table.Column<string>(type: "text", nullable: true),
                    Designation = table.Column<string>(type: "text", nullable: true),
                    IdealBarg = table.Column<float>(type: "real", nullable: false),
                    OpeningPressureBarg = table.Column<float>(type: "real", nullable: false),
                    Remarks = table.Column<string>(type: "text", nullable: true),
                    TestDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Tested = table.Column<bool>(type: "boolean", nullable: false),
                    AttachmentIds = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    QuartzItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuartzItemsValveMaintenances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuartzItemsValveMaintenances_QuartzItems_QuartzItemId",
                        column: x => x.QuartzItemId,
                        principalTable: "QuartzItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                values: new object[,]
                {
                    { 2, "QUARTZ", new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434), 0, 1, true, "Temp" },
                    { 1, "QUARTZ", new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434), 2, 1, true, "Main" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuartzItems_DrawingSettingsId",
                table: "QuartzItems",
                column: "DrawingSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzItemsInformations_QuartzItemId",
                table: "QuartzItemsInformations",
                column: "QuartzItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuartzItemsInspections_QuartzItemId",
                table: "QuartzItemsInspections",
                column: "QuartzItemId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzItemsThicknessMeasurements_QuartzItemId",
                table: "QuartzItemsThicknessMeasurements",
                column: "QuartzItemId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzItemsValveMaintenances_QuartzItemId",
                table: "QuartzItemsValveMaintenances",
                column: "QuartzItemId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinks_MainDrawingSettingsId",
                table: "QuartzLinks",
                column: "MainDrawingSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuartzLinksDrawingFeatures_DrawingSettingsId",
                table: "QuartzLinksDrawingFeatures",
                column: "DrawingSettingsId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "FileUploads");

            migrationBuilder.DropTable(
                name: "LookupItemsComponentTypes");

            migrationBuilder.DropTable(
                name: "LookupItemsFittingTypes");

            migrationBuilder.DropTable(
                name: "LookupItemsMethods");

            migrationBuilder.DropTable(
                name: "LookupItemsOperators");

            migrationBuilder.DropTable(
                name: "LookupItemsPlantAreas");

            migrationBuilder.DropTable(
                name: "LookupItemsPlantSystems");

            migrationBuilder.DropTable(
                name: "LookupItemsProcedures");

            migrationBuilder.DropTable(
                name: "LookupItemsSpecifications");

            migrationBuilder.DropTable(
                name: "LookupItemsStandardStatements");

            migrationBuilder.DropTable(
                name: "LookupItemsStatuses");

            migrationBuilder.DropTable(
                name: "LookupItemsTechniques");

            migrationBuilder.DropTable(
                name: "LookupItemsWeldTypes");

            migrationBuilder.DropTable(
                name: "QuartzItemsInformations");

            migrationBuilder.DropTable(
                name: "QuartzItemsInspections");

            migrationBuilder.DropTable(
                name: "QuartzItemsThicknessMeasurements");

            migrationBuilder.DropTable(
                name: "QuartzItemsValveMaintenances");

            migrationBuilder.DropTable(
                name: "QuartzLinks");

            migrationBuilder.DropTable(
                name: "QuartzLinksDrawingFeatures");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "QuartzItems");

            migrationBuilder.DropTable(
                name: "QuartzLinksDrawingSettings");
        }
    }
}
