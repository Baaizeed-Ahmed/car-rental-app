using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserAuthenticationApi.Data;
using UserAuthenticationApi.Models;

namespace UserAuthenticationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RentalController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Rental/{userId}/{carId}
        [HttpPost("{userId}/{carId}")]
        public async Task<ActionResult> RentCar(int userId, int carId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Check if the user is currently renting any car
                    var userRental = await _context.Rentals
                        .FirstOrDefaultAsync(r => r.UserId == userId && r.IsActive);

                    // If the user has an active rental, do not allow them to rent another car
                    if (userRental != null)
                    {
                        return BadRequest("You are already renting a car.");
                    }

                    // Get the car to rent
                    var carToRent = await _context.Cars.FindAsync(carId);
                    if (carToRent == null || !carToRent.IsAvailable)
                    {
                        return NotFound("Car is not available.");
                    }

                    // Create a new rental record
                    var rental = new Rental
                    {
                        UserId = userId,
                        CarId = carId,
                        RentalDate = DateTime.UtcNow,
                        IsActive = true
                    };

                    // Mark the car as not available
                    carToRent.IsAvailable = false;

                    // Add the new rental record to the context
                    _context.Rentals.Add(rental);

                    // Save changes in the transaction
                    await _context.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return Ok(new { RentalId = rental.Id, Message = "Car rented successfully." });
                }
                catch (Exception ex)
                {
                    // Rollback the transaction if any error occurs
                    await transaction.RollbackAsync();

                    // Log the exception here using a logging framework
                    return StatusCode(500, "An error occurred while renting the car: " + ex.Message);
                }
            }
        }

        // POST: api/Rental/Return/{userId}/{carId}
        [HttpPost("Return/{userId}/{carId}")]
        public async Task<ActionResult> ReturnCar(int userId, int carId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Find the active rental for the user and car
                    var rental = await _context.Rentals
                        .FirstOrDefaultAsync(r => r.UserId == userId && r.CarId == carId && r.IsActive);

                    if (rental == null)
                    {
                        return BadRequest("No active rental found for this car and user.");
                    }

                    // Mark the rental as inactive and set the return date
                    rental.IsActive = false;
                    rental.ReturnDate = DateTime.UtcNow;

                    // Mark the car as available
                    var car = await _context.Cars.FindAsync(carId);
                    if (car != null)
                    {
                        car.IsAvailable = true;
                    }

                    // Save the changes
                    await _context.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return Ok("Car returned successfully.");
                }
                catch (Exception ex)
                {
                    // Rollback the transaction in case of error
                    await transaction.RollbackAsync();

                    // Log the exception here
                    return StatusCode(500, "An error occurred while returning the car: " + ex.Message);
                }
            }
        }
        // GET: api/Rental/Current/{userId}
        [HttpGet("Current/{userId}")]
        public async Task<ActionResult> GetCurrentRental(int userId)
        {
            // Find the active rental for the user
            var rental = await _context.Rentals
                .Where(r => r.UserId == userId && r.IsActive)
                .Include(r => r.Car) // Assuming there is a navigation property named Car in the Rental model
                .FirstOrDefaultAsync();

            if (rental == null)
            {
                return NotFound("No active rental found for this user.");
            }

            var car = rental.Car;
            if (car == null)
            {
                return NotFound("The car for this rental does not exist.");
            }

            // Assuming the Car model has an ImageUrl and Name properties
            return Ok(new
            {
                CarId = car.Id,
                CarName = car.Name,
                CarImageUrl = car.ImageUrl,
                CarPricePerDay=car.PricePerDay,
            });
        }
        // POST: api/Car/return/{id}
        [HttpPost("return/{id}")]
        public async Task<IActionResult> ReturnCar(int id)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Find the active rental for the car
                    var rental = await _context.Rentals
                        .FirstOrDefaultAsync(r => r.CarId == id && r.IsActive);

                    if (rental == null)
                    {
                        return BadRequest("No active rental found for this car.");
                    }

                    // Mark the rental as inactive and set the return date
                    rental.IsActive = false;
                    rental.ReturnDate = DateTime.UtcNow;

                    // Mark the car as available
                    var car = await _context.Cars.FindAsync(id);
                    if (car != null)
                    {
                        car.IsAvailable = true;
                    }
                    else
                    {
                        return NotFound("The car does not exist.");
                    }

                    // Save the changes
                    await _context.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();

                    return Ok("Car returned successfully.");
                }
                catch (Exception ex)
                {
                    // Rollback the transaction in case of error
                    await transaction.RollbackAsync();

                    // Log the exception here
                    return StatusCode(500, "An error occurred while returning the car: " + ex.Message);
                }
            }
        }
    }
}
