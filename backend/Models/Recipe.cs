using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Projekt4.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        // Foreign key to the Category
        public int CategoryId { get; set; }
        
        // Avoid circular reference by ignoring during serialization
        [JsonIgnore]
        public Category? Category { get; set; }

        // Navigation properties for related entities
        public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
    }
}
