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
    public class TopicConfiguration : IEntityTypeConfiguration<Topic>
    {
        public void Configure(EntityTypeBuilder<Topic> builder)
        {
            builder.ToTable("Topics");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(512);
            builder.Property(t => t.CreatedAt)
            .IsRequired();
            builder.Property(t => t.EntryCount)
            .HasDefaultValue(0);
            builder.HasMany(t => t.Entries)
            .WithOne(e => e.Topic)
            .HasForeignKey(e => e.TopicId)
            .OnDelete(DeleteBehavior.Cascade);
            builder.HasIndex(t => t.CreatedAt).HasDatabaseName("IX_Topics_CreatedAt");
        }
    }
}

