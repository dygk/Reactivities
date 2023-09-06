using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIndentityServices(this IServiceCollection services, IConfiguration config)
        {



            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authenticationthis is my custom Secret key for authentication"));


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
         .AddJwtBearer(opt =>
         {
             opt.TokenValidationParameters = new TokenValidationParameters
             {
                 ValidateIssuerSigningKey = true,
                 IssuerSigningKey = key,
                 ValidateIssuer = false,
                 ValidateAudience = false
             };
             opt.Events = new JwtBearerEvents
             {
                 OnMessageReceived = context =>
                 {
                     var accessToken = context.Request.Query["access_token"];
                     var path = context.HttpContext.Request.Path;
                     if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                     {
                         context.Token = accessToken;
                     }
                     return Task.CompletedTask;
                 }
             };
         });
            services.AddScoped<TokenService>();

            return services;
        }
    }
}