using Microsoft.EntityFrameworkCore;
using UserAuthenticationApi.Models;

namespace UserAuthenticationApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; } // Add this line
    }
}
