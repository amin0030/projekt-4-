using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekt4.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [NotMapped]
        public string Password { get; set; } // Used only for plaintext passwords during login/registration

        public string? FirstName { get; set; } // Nullable
        public string? LastName { get; set; }  // Nullable

        public string? Email { get; set; } // Nullable (if needed)

        // Navigation property for favorite recipes
        public ICollection<Recipe> FavoriteRecipes { get; set; } = new List<Recipe>();
    }
}
