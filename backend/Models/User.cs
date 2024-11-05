using System.ComponentModel.DataAnnotations.Schema;
namespace Projekt4.Models


{
    public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public DateTime CreatedAt { get; set; }

    [NotMapped]
    public string Password { get; set; } // Used for receiving the plaintext password only
}

}
