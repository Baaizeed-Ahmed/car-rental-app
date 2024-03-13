using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserAuthenticationApi.Controllers;
using UserAuthenticationApi.Data;
using UserAuthenticationApi.Models;
using Xunit;

namespace UserAuthenticationApi.Tests
{
    public class CarControllerTests
    {
        private readonly DbContextOptions<AppDbContext> _dbContextOptions;

        public CarControllerTests()
        {
            // Setup DbContextOptions for in-memory database for testing
            _dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
        }

        // Utility method to create a context and populate with test data
        private async Task<AppDbContext> GetDbContextWithData()
        {
            var context = new AppDbContext(_dbContextOptions);
            var cars = new List<Car>
    {
        // Make sure to initialize all required properties, including 'ImageUrl'
        new Car { Id = 1, Name = "TestCar1", IsAvailable = true, ImageUrl = "http://example.com/car1.jpg" },
        // Add other test cars as necessary, with all required properties set
    };

            context.Cars.AddRange(cars);
            await context.SaveChangesAsync();
            return context;
        }

        [Fact]
        public async Task GetCars_ReturnsAllCars()
        {
            using (var context = await GetDbContextWithData())
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.GetCars();

                // Assert
                var result = Assert.IsType<ActionResult<IEnumerable<Car>>>(actionResult);
                var cars = Assert.IsType<List<Car>>(result.Value);
                Assert.Equal(1, cars.Count); // Adjust the count based on the number of cars you've added to the context
            }
        }

        [Fact]
        public async Task GetCar_ValidId_ReturnsCar()
        {
            using (var context = await GetDbContextWithData())
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.GetCar(1);

                // Assert
                var result = Assert.IsType<ActionResult<Car>>(actionResult);
                var car = Assert.IsType<Car>(result.Value);
                Assert.Equal(1, car.Id);
            }
        }

        [Fact]
        public async Task GetCar_InvalidId_ReturnsNotFound()
        {
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.GetCar(999); // Assuming 999 is an invalid ID

                // Assert
                Assert.IsType<NotFoundResult>(actionResult.Result);
            }
        }

        [Fact]
        public async Task PostCar_ValidCar_ReturnsCreatedAtAction()
        {
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new CarController(context);
                // Initialize all required properties, including 'ImageUrl'
                var newCar = new Car { Name = "NewCar", IsAvailable = true, ImageUrl = "http://example.com/car-image.jpg" };

                // Act
                var actionResult = await controller.PostCar(newCar);

                // Assert
                var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
                var car = Assert.IsType<Car>(createdAtActionResult.Value);
                Assert.Equal("NewCar", car.Name);
                // If you want to check the ImageUrl as well, you can add another assert here
                Assert.Equal("http://example.com/car-image.jpg", car.ImageUrl);
            }
        }

        [Fact]
        public async Task PutCar_ValidUpdate_ReturnsNoContent()
        {
            using (var context = await GetDbContextWithData())
            {
                var controller = new CarController(context);

                // Fetch the car that you want to update
                var carToUpdate = await context.Cars.FindAsync(1);
                // Modify the properties of the fetched car
                carToUpdate.Name = "UpdatedCar";
                carToUpdate.IsAvailable = true;

                // Act
                var actionResult = await controller.PutCar(1, carToUpdate);

                // Assert
                Assert.IsType<NoContentResult>(actionResult);

                // Additionally, you may want to verify that the changes were saved to the database
                await context.Entry(carToUpdate).ReloadAsync();
                Assert.Equal("UpdatedCar", carToUpdate.Name);
                Assert.True(carToUpdate.IsAvailable); 

            }
        }


        [Fact]
        public async Task PutCar_IdMismatch_ReturnsBadRequest()
        {
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new CarController(context);
                var updatedCar = new Car { Id = 999, Name = "UpdatedCar", IsAvailable = true };

                // Act
                var actionResult = await controller.PutCar(1, updatedCar);

                // Assert
                Assert.IsType<BadRequestResult>(actionResult);
            }
        }

        [Fact]
        public async Task RentCar_AvailableCar_ReturnsOk()
        {
            using (var context = await GetDbContextWithData())
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.RentCar(1);

                // Assert
                var okResult = Assert.IsType<OkObjectResult>(actionResult);
                Assert.Equal($"Car TestCar1 has been rented successfully.", okResult.Value);
            }
        }

        [Fact]
        public async Task RentCar_NotAvailable_ReturnsBadRequest()
        {
            using (var context = await GetDbContextWithData())
            {
                // Assuming car with Id = 1 is already rented
                var car = await context.Cars.FindAsync(1);
                car.IsAvailable = false;
                await context.SaveChangesAsync();

                var controller = new CarController(context);

                // Act
                var actionResult = await controller.RentCar(1);

                // Assert
                var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
                var badRequestValue = Assert.IsType<string>(badRequestResult.Value);
                Assert.Equal("Car is already rented.", badRequestValue);
            }
        }



        [Fact]
        public async Task DeleteCar_ValidId_ReturnsNoContent()
        {
            using (var context = await GetDbContextWithData())
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.DeleteCar(1);

                // Assert
                Assert.IsType<NoContentResult>(actionResult);
            }
        }

        [Fact]
        public async Task DeleteCar_InvalidId_ReturnsNotFound()
        {
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new CarController(context);

                // Act
                var actionResult = await controller.DeleteCar(999); // Assuming 999 is an invalid ID

                // Assert
                Assert.IsType<NotFoundResult>(actionResult);
            }
        }
    }
}
