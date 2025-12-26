using CleanArchitecture.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Infrastructure.Authorization
{
    public sealed class RoleAuthorizationFilter : IAuthorizationFilter
    {
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly string _role;

        public RoleAuthorizationFilter(IUserRoleRepository repo, string role)
        {
            _userRoleRepository = repo;
            _role = role;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            bool hasRole = _userRoleRepository
                .GetAll()
                .Include(x => x.Role)
                .Any(x => x.UserId == userId && x.Role.Name == _role);

            if (!hasRole)
                context.Result = new ForbidResult();
        }
    }

}
