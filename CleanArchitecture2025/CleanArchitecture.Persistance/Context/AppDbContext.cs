using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CleanArchitecture.Domain.Common;

using CleanArchitecture.Domain.Abstractions;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Persistence.Context
{
    public sealed class AppDbContext : IdentityDbContext<User, Role, string,
        IdentityUserClaim<string>,
        UserRole,
        IdentityUserLogin<string>,
        IdentityRoleClaim<string>,
        IdentityUserToken<string>>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSet'ler
        public DbSet<Topic> Topics => Set<Topic>();
        public DbSet<Entry> Entries { get; set; }
        public DbSet<EntryFavorite> Favorites => Set<EntryFavorite>();
        public DbSet<ErrorLog> ErrorLogs => Set<ErrorLog>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Config klasöründeki tüm mappingleri yükle
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            //  GLOBAL QUERY FILTER
            modelBuilder.Entity<Entry>()
                .HasQueryFilter(x => !x.IsDeleted);
        }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entities = ChangeTracker.Entries<Entity>();

            foreach (var entry in entities)
            {
                if (entry.State == EntityState.Added)
                    entry.Property(p => p.CreatedDate).CurrentValue = DateTime.Now;

                if (entry.State == EntityState.Modified)
                    entry.Property(p => p.UpdatedDate).CurrentValue = DateTime.Now;
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
