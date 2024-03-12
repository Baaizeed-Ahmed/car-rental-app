using System.ComponentModel.DataAnnotations;

namespace UserAuthenticationApi.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal PricePerDay { get; set; }

        [Required]
        public bool IsAvailable { get; set; } = true;
    }
}
