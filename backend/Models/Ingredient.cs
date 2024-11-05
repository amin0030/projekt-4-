using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekt4.Models
{
    public class Ingredient
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Quantity { get; set; } = string.Empty;

        public string? Unit { get; set; } // Make Unit nullable

        public int RecipeId { get; set; }

        // Avoid circular reference by ignoring during serialization
        [JsonIgnore]
        public Recipe? Recipe { get; set; }
    }
}
