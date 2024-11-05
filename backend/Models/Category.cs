using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Projekt4.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty; // Set default value to avoid null warnings

        // Navigation property
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>(); // Initialize as an empty list
    }
}
