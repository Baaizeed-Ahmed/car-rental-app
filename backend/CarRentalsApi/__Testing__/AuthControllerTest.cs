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
            using (var context = new AppDbContext(_dbContextOptions))
            {
                var controller = new AuthController(context);
                var newUser = new User { Username = "testuser", Password = "testpassword" };
                await controller.Register(newUser);

                // Act
                var result = await controller.Login(new User { Username = "testuser", Password = "testpassword" });

                // Assert
                var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
                var loginResult = Assert.IsType<Dictionary<string, object>>(okObjectResult.Value);
                Assert.Equal("Login successful", loginResult["message"]);
                Assert.Equal(newUser.Id, loginResult["userId"]);
                Assert.Equal(newUser.Username, loginResult["username"]);
            }
        }
    }
}
