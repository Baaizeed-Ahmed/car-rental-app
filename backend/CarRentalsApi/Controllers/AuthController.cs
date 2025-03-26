using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuthenticationApi.Data;
using UserAuthenticationApi.Models;
using System.Threading.Tasks;

namespace UserAuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Username == user.Username);
            if (userExists)
            {
                return BadRequest("Username already exists.");
            }

            // Hash password here before saving
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Register", new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] User loginDetails)
        {
            // Hash incoming password and compare with the stored hash
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginDetails.Username);

            if (user == null || user.Password != loginDetails.Password) // Replace with password hash comparison
            {
                return NotFound(new { message = "Invalid login credentials." });
            }

            return Ok(new { message = "Login successful", userId = user.Id, username = user.Username });
        }
    }
}
