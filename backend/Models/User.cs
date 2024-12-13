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
        public string Password { get; set; } 

        public string? FirstName { get; set; } 
        public string? LastName { get; set; }  

        public string? Email { get; set; } 

        
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    }
}
