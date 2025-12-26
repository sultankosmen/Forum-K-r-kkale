using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;
using CleanArchitecture.Persistence.Context;
using GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Persistance.Repositories
{
    public sealed class EntryRepository
       : Repository<Entry, AppDbContext>, IEntryRepository
    {
        public EntryRepository(AppDbContext context) : base(context)
        {
        }
    }
}
