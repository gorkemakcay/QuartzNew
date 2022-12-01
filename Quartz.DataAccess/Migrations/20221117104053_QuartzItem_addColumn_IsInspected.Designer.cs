﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Quartz.DataAccess.Concrete.EntityFramworkCore.Context;

namespace Quartz.DataAccess.Migrations
{
    [DbContext(typeof(QuartzContext))]
    [Migration("20221117104053_QuartzItem_addColumn_IsInspected")]
    partial class QuartzItem_addColumn_IsInspected
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.FileUploads.FileUpload", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Extension")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UploadedBy")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("FileUploads");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsComponentType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsComponentTypes");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsFittingType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsFittingTypes");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsMethods");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsOperator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsOperators");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsPlantArea", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsPlantAreas");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsPlantSystem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LookUpItemsPlantAreas")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsPlantSystems");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsProcedure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LookUpItemsMethod")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsProcedures");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsSpecification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsSpecifications");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsStandardStatement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsStandardStatements");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsStatuses");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsTechnique", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LookUpItemsProcedure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsTechniques");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.LookUpItems.LookUpItemsWeldType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LookupItemsWeldTypes");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttachmentIds")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsInspected")
                        .HasColumnType("bit");

                    b.Property<int>("QuartzLinkId")
                        .HasColumnType("int");

                    b.Property<bool>("ShowLabel")
                        .HasColumnType("bit");

                    b.Property<string>("TagNo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuartzLinkId");

                    b.ToTable("QuartzItems");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItemsThicknessMeasurement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttachmentIds")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("MeasuredThickness")
                        .HasColumnType("real");

                    b.Property<float>("NominalThickness")
                        .HasColumnType("real");

                    b.Property<string>("PlantArea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlantSystem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuartzItemId")
                        .HasColumnType("int");

                    b.Property<string>("Specification")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuartzItemId");

                    b.ToTable("QuartzItemsThicknessMeasurements");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItemsValveMaintenance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttachmentIds")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Designation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("IdealBarg")
                        .HasColumnType("real");

                    b.Property<string>("KKSNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("OpeningPressureBarg")
                        .HasColumnType("real");

                    b.Property<string>("PlantArea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuartzItemId")
                        .HasColumnType("int");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SerialNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SupplierManufacturare")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TestDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Tested")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("QuartzItemId");

                    b.ToTable("QuartzItemsValveMaintenances");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("CurrentDrawingId")
                        .HasColumnType("int");

                    b.Property<int>("MainQuartzLinkId")
                        .HasColumnType("int");

                    b.Property<bool>("ShowLabel")
                        .HasColumnType("bit");

                    b.Property<string>("TagNo")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("QuartzLinks");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLinksDrawingFeatures", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Features")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuartzLinkId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuartzLinkId");

                    b.ToTable("QuartzLinksDrawingFeatures");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLinksDrawingSettings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttachmentIds")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DrawingNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("File")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlantArea")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlantSystem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuartzLinkId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuartzLinkId")
                        .IsUnique();

                    b.ToTable("QuartzLinksDrawingSettings");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Projects.Item.QuartzItemsInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FittingType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("OperatingPressureBar")
                        .HasColumnType("real");

                    b.Property<float>("OperatingTempC")
                        .HasColumnType("real");

                    b.Property<float>("PipeOdIn")
                        .HasColumnType("real");

                    b.Property<float>("PipeThicknessMm")
                        .HasColumnType("real");

                    b.Property<int>("QuartzItemId")
                        .HasColumnType("int");

                    b.Property<string>("SerialNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ShowLabel")
                        .HasColumnType("bit");

                    b.Property<string>("Specification")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TagNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WeldType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuartzItemId")
                        .IsUnique();

                    b.ToTable("QuartzItemsInformations");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Projects.Item.QuartzItemsInspection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttachmentIds")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Details")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Method")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Procedure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuartzItemId")
                        .HasColumnType("int");

                    b.Property<string>("ReportNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Technique")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuartzItemId");

                    b.ToTable("QuartzItemsInspections");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Users.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Users.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Users.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Users.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Quartz.Entities.Concrete.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Users.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItem", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Link.QuartzLink", "QuartzLink")
                        .WithMany("Items")
                        .HasForeignKey("QuartzLinkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzLink");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItemsThicknessMeasurement", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Item.QuartzItem", "QuartzItem")
                        .WithMany()
                        .HasForeignKey("QuartzItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzItem");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItemsValveMaintenance", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Item.QuartzItem", "QuartzItem")
                        .WithMany()
                        .HasForeignKey("QuartzItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzItem");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLinksDrawingFeatures", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Link.QuartzLink", "QuartzLink")
                        .WithMany("DrawingFeatures")
                        .HasForeignKey("QuartzLinkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzLink");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLinksDrawingSettings", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Link.QuartzLink", "QuartzLink")
                        .WithOne("DrawingSettings")
                        .HasForeignKey("Quartz.Entities.Concrete.Project.Link.QuartzLinksDrawingSettings", "QuartzLinkId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzLink");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Projects.Item.QuartzItemsInformation", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Item.QuartzItem", "QuartzItem")
                        .WithOne("Information")
                        .HasForeignKey("Quartz.Entities.Concrete.Projects.Item.QuartzItemsInformation", "QuartzItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzItem");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Projects.Item.QuartzItemsInspection", b =>
                {
                    b.HasOne("Quartz.Entities.Concrete.Project.Item.QuartzItem", "QuartzItem")
                        .WithMany("Inspections")
                        .HasForeignKey("QuartzItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuartzItem");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Item.QuartzItem", b =>
                {
                    b.Navigation("Information");

                    b.Navigation("Inspections");
                });

            modelBuilder.Entity("Quartz.Entities.Concrete.Project.Link.QuartzLink", b =>
                {
                    b.Navigation("DrawingFeatures");

                    b.Navigation("DrawingSettings");

                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
