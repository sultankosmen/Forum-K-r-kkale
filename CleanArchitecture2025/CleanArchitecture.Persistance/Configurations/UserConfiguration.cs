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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.UserName)
            .IsRequired()
            .HasMaxLength(256);
            builder.Property(u => u.Email)
            .HasMaxLength(256);
            builder.Property(u => u.NameLastName)
            .HasMaxLength(256)
            .IsRequired(false);
            builder.Property(u => u.RefreshToken)
            .HasMaxLength(512)
            .IsRequired(false);
            builder.Property(u => u.RefreshTokenExpires)
            .IsRequired(false);
            // Indexes
            builder.HasIndex(u => u.NormalizedUserName).HasDatabaseName("IX_Users_NormalizedUserName");
            builder.HasIndex(u => u.NormalizedEmail).HasDatabaseName("IX_Users_NormalizedEmail");
        }
    }
}

