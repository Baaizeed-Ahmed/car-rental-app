using System;
using System.Collections.Generic;
using System.Linq;
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
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Unique database name for test
                .Options;

            User testUser;
            using (var arrangeContext = new AppDbContext(options))
            {
                testUser = new User { Username = "testuser", Password = "testpassword" };
                arrangeContext.Users.Add(testUser);
                await arrangeContext.SaveChangesAsync();
            }

            // Act & Assert
            using (var actAssertContext = new AppDbContext(options))
            {
                var controller = new AuthController(actAssertContext);

                // Act
                var loginResult = await controller.Login(new User { Username = "testuser", Password = "testpassword" });

                // Assert
                var okObjectResult = Assert.IsType<OkObjectResult>(loginResult.Result);
                dynamic loginResponse = okObjectResult.Value;
                Assert.Equal("Login successful", loginResponse.message);
                Assert.Equal(testUser.Id, loginResponse.userId); ; // Here we're using the ID from the testUser
            }
        }


    }
}
