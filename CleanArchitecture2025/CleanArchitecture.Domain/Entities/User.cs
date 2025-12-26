using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
namespace CleanArchitecture.Domain.Entities
{
    public sealed class User : IdentityUser
    {
        public User()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string NameLastName { get; set; } = string.Empty;

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpires { get; set; }
        public ICollection<EntryFavorite> Favorites { get; set; } = new List<EntryFavorite>();

    }
}

