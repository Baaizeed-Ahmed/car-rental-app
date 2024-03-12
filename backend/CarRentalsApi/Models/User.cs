using System.ComponentModel.DataAnnotations;

namespace UserAuthenticationApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
