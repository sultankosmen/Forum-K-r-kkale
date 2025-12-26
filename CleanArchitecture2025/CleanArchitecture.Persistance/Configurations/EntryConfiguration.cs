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
    public class EntryConfiguration : IEntityTypeConfiguration<Entry>
    {
        public void Configure(EntityTypeBuilder<Entry> builder)
        {
            builder.ToTable("Entries");

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Content)
            .IsRequired()
            .HasMaxLength(4000);

            builder.Property(e => e.CreatedAt)
            .IsRequired();

            builder.Property(e => e.IpAddress)
            .HasMaxLength(45) // IPv6 max length
            .IsRequired(false);

            builder.Property(e => e.FavoriteCount)
            .HasDefaultValue(0);

            builder.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Topic)
            .WithMany(t => t.Entries)
            .HasForeignKey(e => e.TopicId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(e => e.CreatedAt).HasDatabaseName("IX_Entries_CreatedAt");
        }
    }
}

