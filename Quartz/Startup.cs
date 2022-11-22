using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz.BusinessLogic.DIContainer;
using Quartz.Common.Mapping.AutoMapperProfile;
using Quartz.CustomCollectionExtensions;
using Quartz.DataAccess.Concrete.EntityFramworkCore.Context;
using Quartz.DataAccess.DIContainer;
using Quartz.Entities.Concrete.Users;
using System;

namespace Quartz
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        [Obsolete]
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddContainerWithDependenciesDal(); // Dal Dependency Injection ayarlar�. Static class,ba��ml�l�klar� i�erisinde bulunduruyor.
            services.AddContainerWithDependenciesBll(); // Bll Dependency Injection ayarlar�. Static class,ba��ml�l�klar� i�erisinde bulunduruyor.
            services.AddDbContext<QuartzContext>(); // DB Context ayar�.
            services.AddCustomIdentity(); // Identity configuration.
            services.AddAutoMapper(typeof(MapProfile));
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddSession();
            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });
            services.AddNodeServices();
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
                              IWebHostEnvironment env,
                              UserManager<AppUser> userManager,
                              RoleManager<AppRole> roleManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/SignInUser/Index");
            }
            app.UseStatusCodePagesWithReExecute("/Home/StatusCode", "?code={0}");
            app.UseSession();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();
            IdentityInitializer.SeedData(userManager, roleManager).Wait();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                        name: "areas",
                        pattern: "{area}/{controller=Home}/{action=LogIn}/{id?}");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=SignInUser}/{action=Index}/{id?}");
            });
        }
    }
}
