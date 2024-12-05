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
        public string Password { get; set; } // Bruges kun til at modtage plaintext-passwords under login/registrering

        // Ny egenskab for Email
        public string Email { get; set; }

        // Navigationsegenskab for favoritrecepter
        public ICollection<Recipe> FavoriteRecipes { get; set; } = new List<Recipe>();
    }
}
