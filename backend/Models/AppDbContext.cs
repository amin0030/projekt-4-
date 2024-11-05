using Microsoft.EntityFrameworkCore;
using Projekt4.Models;
using Microsoft.Extensions.Configuration;

namespace Projekt4
{
    public class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
        public DbSet<Recipe> Recipes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions => sqlOptions.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Call the external seeding class
            DbSeeder.Seed(modelBuilder);

            // Define relationships if necessary
            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Ingredients)
                .WithOne(i => i.Recipe)
                .HasForeignKey(i => i.RecipeId);

            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Instructions)
                .WithOne(instr => instr.Recipe)
                .HasForeignKey(instr => instr.RecipeId);
        }
    }
}
