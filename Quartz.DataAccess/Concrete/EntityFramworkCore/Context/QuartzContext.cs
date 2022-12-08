using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Quartz.Entities.Concrete.FileUploads;
using Quartz.Entities.Concrete.LookUpItems;
using Quartz.Entities.Concrete.Project.Item;
using Quartz.Entities.Concrete.Project.Link;
using Quartz.Entities.Concrete.Projects.Item;
using Quartz.Entities.Concrete.Users;
using System;

namespace Quartz.DataAccess.Concrete.EntityFramworkCore.Context
{
    public class QuartzContext : IdentityDbContext<AppUser, AppRole, int>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.LogTo(Console.WriteLine).EnableSensitiveDataLogging();
            //optionsBuilder.UseSqlServer(@"Server=DESKTOP-P12SOIP\SQLEXPRESS;Database=Quartz4;uid=umutd;pwd=Ud4583!");
            //optionsBuilder.UseSqlServer(@"Server=DESKTOP-P12SOIP\SQLEXPRESS;Database=Quartz123;uid=umutd;pwd=Ud4583!");

            //optionsBuilder.UseSqlServer(@"Server=DESKTOP-P12SOIP\SQLEXPRESS;Database=QuartzNew2;uid=umutd;pwd=Ud4583!");
            //optionsBuilder.UseNpgsql(@"User ID=postgres;Password=*!grkm_0;Server=localhost;Port=5432;Database=Quartz;");

            // local server connection 94.138.222.82:81
            //optionsBuilder.UseNpgsql(@"User ID=quartz;Password=!*quartz_2022.;Server=localhost;Port=5432;Database=Quartz_22;");

            // remote server connection
            optionsBuilder.UseNpgsql(@"Host=94.138.222.82;Port=5432;Password=!*quartz_2022.;Persist Security Info=false;Username=quartz;Database=Quartz_22;Timeout=300;Keepalive=300", opt => opt.SetPostgresVersion(new Version("9.6")));

            //optionsBuilder.UseSqlServer(@"Server=DESKTOP-P12SOIP\SQLEXPRESS;Database=QuartzNew;uid=umutd;pwd=Ud4583!");

            //optionsBuilder.UseSqlServer(@"Server=94.73.170.39;Database=u0406106_Quartz;uid=u0406106_quartz;pwd=ArlentusControl2013**");
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Configurate View's
            modelBuilder.Entity<QuartzItemFilter>(c =>
            {
                c.HasNoKey();
                c.ToView("vw_SearchItem");
            });
            #endregion

            #region Create User
            var appUser = new AppUser
            {
                Id = 1,
                Email = "admin@quartz.com",
                NormalizedEmail = "ADMIN@QUARTZ.COM",
                LockoutEnabled = true,
                FirstName = "Admin",
                LastName = "Quartz",
                FullName = "Admin Quartz",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                SecurityStamp = "a3635eb1-112c-4cca-9e6e-b81e636d99c2",
                ConcurrencyStamp = "fe13649b-6a19-4964-8db8-1332ba224904",
                PasswordHash = "AQAAAAEAACcQAAAAECnTVUK/QxKYvnJiVDztpm9YuvXVCbwiW86jvTxkNOXv/27Nzr1OVjy4hbtRdcoZjg==",
            };

            #region Set User Password
            //PasswordHasher<AppUser> passwordHasher = new();
            //appUser.PasswordHash = passwordHasher.HashPassword(appUser, "1");
            #endregion

            #endregion

            #region Seed User
            modelBuilder.Entity<AppUser>(user =>
            {
                user.HasData(appUser);
            });
            #endregion

            #region Seed Role

            #region Admin
            modelBuilder.Entity<AppRole>(role =>
            {
                role.HasData(
                    new AppRole
                    {
                        Id = 1,
                        Name = "Admin",
                        NormalizedName = "ADMIN",
                        ConcurrencyStamp = "707b717a-d330-450f-a42c-9f2b7fcdfea1"
                    });
            });
            #endregion

            #region Operator
            modelBuilder.Entity<AppRole>(role =>
            {
                role.HasData(
                    new AppRole
                    {
                        Id = 2,
                        Name = "Operator",
                        NormalizedName = "OPERATOR",
                        ConcurrencyStamp = "6eadcc3d-21a3-41b8-91bd-26988bb8d656"
                    });
            });
            #endregion

            #endregion

            #region Set User Role

            #region To Admin
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new { UserId = 1, RoleId = 1 });
            #endregion

            #region To Operator

            #endregion

            #endregion

            #region Seed Main Link & Its Relations

            #region Main Link
            modelBuilder.Entity<QuartzLink>(link =>
            {
                link.HasData(
                    new QuartzLink
                    {
                        Id = 1,
                        TagNo = "Main",
                        ShowLabel = true,
                        CreatedBy = "QUARTZ",
                        MainDrawingSettingsId = 1,
                        DrawingSettingsId = 2,
                        CreatedDate = new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434)
                    });
            });
            #endregion

            #region Temporary Link
            modelBuilder.Entity<QuartzLink>(link =>
            {
                link.HasData(
                    new QuartzLink
                    {
                        Id = 2,
                        TagNo = "Temp",
                        ShowLabel = true,
                        CreatedBy = "QUARTZ",
                        MainDrawingSettingsId = 1,
                        DrawingSettingsId = 0,
                        CreatedDate = new DateTime(2022, 11, 24, 11, 40, 23, 643, DateTimeKind.Local).AddTicks(6434)
                    });
            });
            #endregion

            #region General Drawing Settings
            modelBuilder.Entity<QuartzLinksDrawingSettings>().HasData(new QuartzLinksDrawingSettings
            {
                Id = 1,
                DrawingNo = "General",
                Description = null,
                CurrentDrawingId = 1,
                PlantArea = null,
                PlantSystem = null,
                AttachmentIds = null
            });
            #endregion

            #region Main Link's Drawing Settings
            modelBuilder.Entity<QuartzLinksDrawingSettings>().HasData(new QuartzLinksDrawingSettings
            {
                Id = 2,
                DrawingNo = "Main",
                Description = null,
                CurrentDrawingId = 1,
                PlantArea = "select",
                PlantSystem = "select",
                AttachmentIds = null
            });
            #endregion

            #region Main Link's File
            modelBuilder.Entity<FileUpload>(file =>
            {
                file.HasData(
                    new FileUpload
                    {
                        Id = 1,
                        Name = "MainDrawing",
                        Type = "image/jpeg",
                        Extension = ".jpg",
                        Path = "wwwroot\\Files\\MainDrawing.jpg",
                        UploadedBy = "QUARTZ",
                        CreatedDate = new DateTime(2022, 11, 24, 11, 40, 23, 645, DateTimeKind.Local).AddTicks(4467)
                    });
            });
            #endregion

            #endregion

            base.OnModelCreating(modelBuilder);
        }

        #region DbSets
        public DbSet<AppUser> AspNetUsers { get; set; }
        public DbSet<AppRole> AspNetRoles { get; set; }

        public DbSet<FileUpload> FileUploads { get; set; }

        public DbSet<QuartzLink> QuartzLinks { get; set; }
        public DbSet<QuartzLinksDrawingFeatures> QuartzLinksDrawingFeatures { get; set; }
        public DbSet<QuartzLinksDrawingSettings> QuartzLinksDrawingSettings { get; set; }

        public DbSet<QuartzItem> QuartzItems { get; set; }
        public DbSet<QuartzItemsInformation> QuartzItemsInformations { get; set; }
        public DbSet<QuartzItemsInspection> QuartzItemsInspections { get; set; }
        public DbSet<QuartzItemsValveMaintenance> QuartzItemsValveMaintenances { get; set; }
        public DbSet<QuartzItemsThicknessMeasurement> QuartzItemsThicknessMeasurements { get; set; }

        public DbSet<LookUpItemsComponentType> LookupItemsComponentTypes { get; set; }
        public DbSet<LookUpItemsFittingType> LookupItemsFittingTypes { get; set; }
        public DbSet<LookUpItemsMethod> LookupItemsMethods { get; set; }
        public DbSet<LookUpItemsOperator> LookupItemsOperators { get; set; }
        public DbSet<LookUpItemsPlantArea> LookupItemsPlantAreas { get; set; }
        public DbSet<LookUpItemsPlantSystem> LookupItemsPlantSystems { get; set; }
        public DbSet<LookUpItemsProcedure> LookupItemsProcedures { get; set; }
        public DbSet<LookUpItemsSpecification> LookupItemsSpecifications { get; set; }
        public DbSet<LookUpItemsStandardStatement> LookupItemsStandardStatements { get; set; }
        public DbSet<LookUpItemsStatus> LookupItemsStatuses { get; set; }
        public DbSet<LookUpItemsTechnique> LookupItemsTechniques { get; set; }
        public DbSet<LookUpItemsWeldType> LookupItemsWeldTypes { get; set; }
        public DbSet<QuartzItemFilter> vw_SearchItem { get; set; }

        #endregion
    }
}
