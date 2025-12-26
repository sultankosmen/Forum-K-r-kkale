using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Persistance.Configurations
{
    public class EntryFavoriteConfiguration : IEntityTypeConfiguration<EntryFavorite>
    {
        public void Configure(EntityTypeBuilder<EntryFavorite> builder)
        {
            builder.ToTable("EntryFavorites");
            builder.HasKey(ef => new { ef.EntryId, ef.UserId });
            builder.HasOne(ef => ef.Entry)
            .WithMany(e => e.Favorites)
            .HasForeignKey(ef => ef.EntryId)
            .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(ef => ef.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(ef => ef.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

