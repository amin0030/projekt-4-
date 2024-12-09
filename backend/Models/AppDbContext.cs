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

        // Define DbSet properties for each entity
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Favorite> Favorites { get; set; } // For the Favorites relationship

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
            // Seed data if necessary
            DbSeeder.Seed(modelBuilder);

            // Define relationships for Recipe and Ingredients
            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Ingredients)
                .WithOne(i => i.Recipe)
                .HasForeignKey(i => i.RecipeId);

            modelBuilder.Entity<Recipe>()
                .HasMany(r => r.Instructions)
                .WithOne(instr => instr.Recipe)
                .HasForeignKey(instr => instr.RecipeId);

            // Define the relationship for Favorites
            modelBuilder.Entity<Favorite>()
                .HasKey(f => f.Id); // Primary Key for Favorites

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites) // A User can have many Favorites
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete favorites when user is deleted

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Recipe)
                .WithMany() // A Recipe does not track its Favorites directly
                .HasForeignKey(f => f.RecipeId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete favorites when recipe is deleted

            base.OnModelCreating(modelBuilder);
        }
    }
}
