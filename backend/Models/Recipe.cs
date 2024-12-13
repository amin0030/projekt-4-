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

        public string? Image { get; set; } = null; // Optional image URL


        public int CategoryId { get; set; }
        

        [JsonIgnore]
        public Category? Category { get; set; }

        
        public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
    }
}
