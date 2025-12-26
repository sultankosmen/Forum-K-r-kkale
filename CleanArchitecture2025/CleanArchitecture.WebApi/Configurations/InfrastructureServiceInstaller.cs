using CleanArchitecture.Application.Abstractions;
using CleanArchitecture.Infrastructure.Authenticaton;
using CleanArchitecture.WebApi.OptionsSetup.OptionsSetup;

namespace CleanArchitecture.WebApi.Configurations
{
    public sealed class InfrastructureServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration, IHostBuilder host)
        {
            services.AddScoped<IJwtProvider, JwtProvider>();

            services.ConfigureOptions<JwtOptionsSetup>();
            services.ConfigureOptions<JwtBearerOptionsSetup>();
        }
    }
}
