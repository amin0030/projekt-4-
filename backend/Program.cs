using Projekt4;
using Projekt4.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OpenAI.GPT3.Extensions;
using OpenAI.GPT3.Interfaces;
using OpenAI.GPT3.ObjectModels.RequestModels;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configure the server to listen on all network interfaces
builder.WebHost.UseUrls("http://0.0.0.0:5224");

// Add database context with SQL Server connection and enable retry on failure
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()));

// Add OpenAI service
builder.Services.AddOpenAIService(options =>
{
    options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
});

// Add CORS to allow connections from React Native frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add controllers with options to handle reference loops in JSON serialization
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Projekt4 API",
        Description = "API for the Projekt4 backend"
    });
});

var app = builder.Build();

// Ensure Swagger works for both Development and Production
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Projekt4 API v1");
    options.RoutePrefix = ""; // Serve Swagger UI at root ("/")
});

// Enable CORS with the "AllowAll" policy
app.UseCors("AllowAll");

// Enable routing and map controllers
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Map all controller routes

    // Endpoint: Get All Categories
    endpoints.MapGet("/categories", async (AppDbContext db) =>
    {
        var categories = await db.Categories.ToListAsync();
        return Results.Ok(categories);
    });

    // Endpoint: Get Recipe by ID
    endpoints.MapGet("/recipes/{recipeId}", async (AppDbContext db, int recipeId) =>
    {
        var recipe = await db.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Instructions)
            .FirstOrDefaultAsync(r => r.Id == recipeId);

        if (recipe == null)
        {
            return Results.NotFound("Recipe not found");
        }

        var recipeDetails = new
        {
            recipe.Id,
            recipe.Name,
            recipe.Description,
            recipe.Image,
            Ingredients = recipe.Ingredients.Select(i => new { i.Id, i.Name }),
            Instructions = recipe.Instructions.Select(instr => new { instr.Id, instr.Step, instr.Description })
        };

        return Results.Ok(recipeDetails);
    });

    // Endpoint: Get Recipes by Category
    endpoints.MapGet("/categories/{categoryId}/recipes", async (AppDbContext db, int categoryId) =>
    {
        var category = await db.Categories.Include(c => c.Recipes).FirstOrDefaultAsync(c => c.Id == categoryId);
        if (category == null)
        {
            return Results.NotFound("Category not found");
        }

        var recipes = category.Recipes.Select(r => new
        {
            r.Id,
            r.Name,
            r.Description,
            r.Image
        });

        return Results.Ok(recipes);
    });

    // Endpoint: Get All Recipes
    endpoints.MapGet("/recipes", async (AppDbContext db) =>
    {
        var recipes = await db.Recipes
                              .Include(r => r.Ingredients)
                              .Include(r => r.Instructions)
                              .Select(r => new
                              {
                                  r.Id,
                                  r.Name,
                                  r.Description,
                                  r.Image,
                                  Ingredients = r.Ingredients.Select(i => new { i.Id, i.Name }),
                                  Instructions = r.Instructions.Select(instr => new { instr.Id, instr.Step, instr.Description })
                              })
                              .ToListAsync();

        return Results.Ok(recipes);
    });

    // Endpoint: Search Recipes
    endpoints.MapGet("/recipes/search", async (AppDbContext db, string query) =>
    {
        var recipes = await db.Recipes
                              .Where(r => r.Name.Contains(query))
                              .Include(r => r.Ingredients)
                              .Include(r => r.Instructions)
                              .Select(r => new
                              {
                                  r.Id,
                                  r.Name,
                                  r.Description,
                                  r.Image,
                                  Ingredients = r.Ingredients.Select(i => new { i.Id, i.Name }),
                                  Instructions = r.Instructions.Select(instr => new { instr.Id, instr.Step, instr.Description })
                              })
                              .ToListAsync();

        return Results.Ok(recipes);
    });

    // Endpoint: Save User Profile
    endpoints.MapPut("/users/{id}/profile", async (AppDbContext db, int id, User updatedProfile) =>
    {
        var user = await db.Users.Include(u => u.FavoriteRecipes).FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return Results.NotFound("User not found.");
        }

        // Update fields
        user.FirstName = updatedProfile.FirstName ?? user.FirstName;
        user.LastName = updatedProfile.LastName ?? user.LastName;
        user.Username = updatedProfile.Username ?? user.Username;
        user.Email = updatedProfile.Email ?? user.Email;

        await db.SaveChangesAsync();

        return Results.Ok(new
        {
            Message = "Profile updated successfully.",
            User = new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Username,
                user.Email
            }
        });
    });

    // Endpoint: Get User Profile
    endpoints.MapGet("/users/{id}/profile", async (AppDbContext db, int id) =>
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return Results.NotFound(new { Message = "User not found" });
        }

        return Results.Ok(new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            user.Username,
        });
    });

    // Endpoint: Create Recipe for Logged-In User
    endpoints.MapPost("/users/{userId}/recipes", async (AppDbContext db, int userId, Recipe recipe) =>
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
        {
            return Results.BadRequest("User not found.");
        }

        if (string.IsNullOrEmpty(recipe.Name) || string.IsNullOrEmpty(recipe.Description) || recipe.CategoryId == 0)
        {
            return Results.BadRequest("Invalid recipe data. Please provide a name, description, and valid category ID.");
        }

        db.Recipes.Add(recipe);
        await db.SaveChangesAsync();

        return Results.Created($"/recipes/{recipe.Id}", recipe);
    });

    // Endpoint: Add Recipe to Favorites
    endpoints.MapPost("/favorites", async (AppDbContext db, int userId, int recipeId) =>
    {
        var user = await db.Users.Include(u => u.FavoriteRecipes).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
        {
            return Results.NotFound("User not found");
        }

        var recipe = await db.Recipes.FindAsync(recipeId);
        if (recipe == null)
        {
            return Results.NotFound("Recipe not found");
        }

        user.FavoriteRecipes.Add(recipe);
        await db.SaveChangesAsync();

        return Results.Ok("Recipe added to favorites");
    });

    // Endpoint: User Registration
    endpoints.MapPost("/register", async (AppDbContext db, User user) =>
    {
        var existingUser = await db.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
        if (existingUser != null)
        {
            return Results.BadRequest("Username already exists");
        }

        if (string.IsNullOrEmpty(user.Password))
        {
            return Results.BadRequest("Password cannot be empty");
        }

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
        user.Password = null;

        db.Users.Add(user);
        await db.SaveChangesAsync();

        return Results.Ok("User registered successfully");
    });

    // Endpoint: User Login
    endpoints.MapPost("/login", async (AppDbContext db, UserLogin login) =>
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
        {
            return Results.BadRequest("Invalid username or password.");
        }

        return Results.Ok(new
        {
            Message = "Login successful",
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email
        });
    });

    // Endpoint: Delete Account
    endpoints.MapDelete("/users/{id}", async (AppDbContext db, int id) =>
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null)
        {
            return Results.NotFound("User not found");
        }

        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return Results.Ok("User account deleted successfully.");
    });

    // Endpoint: Chatbot using OpenAI GPT
    endpoints.MapPost("/chat", async (IOpenAIService openAIService, HttpContext context) =>
    {
        using var reader = new StreamReader(context.Request.Body);
        var body = await reader.ReadToEndAsync();

        var input = JsonSerializer.Deserialize<ChatRequest>(body);
        if (string.IsNullOrWhiteSpace(input?.Message))
        {
            return Results.BadRequest("Message cannot be empty.");
        }

        var completionRequest = new CompletionCreateRequest
        {
            Model = OpenAI.GPT3.ObjectModels.Models.TextDavinciV3,
            Prompt = input.Message,
            MaxTokens = 300,
            Temperature = 0.7f
        };

        var completionResult = await openAIService.Completions.CreateCompletion(completionRequest);
        if (completionResult.Successful)
        {
            return Results.Ok(new { response = completionResult.Choices.FirstOrDefault()?.Text.Trim() });
        }
        else
        {
            return Results.Problem("Error generating response from OpenAI.", statusCode: 500);
        }
    });
});

app.Run();

// ChatRequest model
public class ChatRequest
{
    public string Message { get; set; } = string.Empty; // Default value added
}
