using CleanArchitecture.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities
{
    public class EntryFavorite : BaseEntity
    {
        public int EntryId { get; set; }
        public string UserId { get; set; }
        public Entry Entry { get; set; }
        public User User { get; set; }
    }
}
