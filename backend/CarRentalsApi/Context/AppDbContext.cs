using Microsoft.EntityFrameworkCore;
using UserAuthenticationApi.Models;

namespace UserAuthenticationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // By marking the DbSet properties as virtual, you can mock them in your unit tests.
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Car> Cars { get; set; } // Assuming you have a Car entity
        public virtual DbSet<Rental> Rentals { get; set; } // Assuming you have a Rental entity

        // ... Add any additional DbSets or other context configuration here ...
    }
}
