using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projekt4.Models
{
    public class Instruction
    {
        public int Id { get; set; }

        [Required]
        public int Step { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        public int RecipeId { get; set; }

        
        [JsonIgnore]
        public Recipe? Recipe { get; set; }
    }
}
