using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserAuthenticationApi.Controllers;
using UserAuthenticationApi.Data;
using UserAuthenticationApi.Models;
using Xunit;

namespace UserAuthenticationApi.Tests
{
    public class AuthControllerTests
    {
        private readonly DbContextOptions<AppDbContext> _dbContextOptions;

        public AuthControllerTests()
        {
            _dbContextOptions = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
        }

        [Fact]
        public async Task Register_ValidUser_ReturnsCreatedResponse()
        {
            // Arrange
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new AuthController(context);
                var newUser = new User { Username = "testuser", Password = "testpassword" };

                // Act
                var result = await controller.Register(newUser);

                // Assert
                var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
                var createdUser = Assert.IsType<User>(createdAtActionResult.Value);
                Assert.Equal(newUser.Username, createdUser.Username);
                Assert.Equal(newUser.Password, createdUser.Password);
            }
        }

        [Fact]
        public async Task Login_ValidCredentials_ReturnsOkResponse()
        {
            // Arrange
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new AuthController(context);
                var testUser = new User { Username = "testuser", Password = "testpassword" };
                await context.Users.AddAsync(testUser);
                await context.SaveChangesAsync();

                // Act
                var result = await controller.Login(new User { Username = "testuser", Password = "testpassword" });

                // Assert
                var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
                dynamic loginResponse = okObjectResult.Value;
                Assert.Equal("Login successful", loginResponse.message);
                Assert.Equal(testUser.Id, loginResponse.userId);
            }
        }

        // The following are the new tests added.

        [Fact]
        public async Task Register_ExistingUsername_ReturnsBadRequest()
        {
            // Arrange
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new AuthController(context);
                var existingUser = new User { Username = "existinguser", Password = "existingpassword" };
                await context.Users.AddAsync(existingUser);
                await context.SaveChangesAsync();

                var newUser = new User { Username = "existinguser", Password = "newpassword" };

                // Act
                var result = await controller.Register(newUser);

                // Assert
                var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
                Assert.Equal("Username already exists.", badRequestResult.Value);
            }
        }

        [Fact]
        public async Task Login_InvalidCredentials_ReturnsNotFoundResponse()
        {
            // Arrange
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new AuthController(context);
                var newUser = new User { Username = "testuser", Password = "testpassword" };
                await context.Users.AddAsync(newUser);
                await context.SaveChangesAsync();

                // Act
                var result = await controller.Login(new User { Username = "testuser", Password = "wrongpassword" });

                // Assert
                var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
                dynamic notFoundResponse = notFoundResult.Value;
                Assert.Equal("Invalid login credentials.", notFoundResponse.message);
            }
        }
    }
}
