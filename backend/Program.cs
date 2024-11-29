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
});

// Endpoint: User Registration
app.MapPost("/register", async (AppDbContext db, User user) =>
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
app.MapPost("/login", async (AppDbContext db, UserLogin login) =>
{
    var user = await db.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
    if (user == null)
    {
        return Results.BadRequest("User not found");
    }

    bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash);
    if (!isPasswordValid)
    {
        return Results.BadRequest("Invalid password");
    }

    return Results.Ok("Login successful");
});

// Endpoint: Get All Recipes
app.MapGet("/recipes", async (AppDbContext db) =>
{
    var recipes = await db.Recipes
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Endpoint: Get Recipe by ID
app.MapGet("/recipes/{id}", async (AppDbContext db, int id) =>
{
    var recipe = await db.Recipes
                         .Include(r => r.Ingredients)
                         .Include(r => r.Instructions)
                         .FirstOrDefaultAsync(r => r.Id == id);

    if (recipe == null)
    {
        return Results.NotFound("Recipe not found");
    }

    return Results.Ok(recipe);
});

// Endpoint: Get All Categories
app.MapGet("/categories", async (AppDbContext db) =>
{
    var categories = await db.Categories.ToListAsync();
    return Results.Ok(categories);
});

// Endpoint: Get Recipes by Category ID
app.MapGet("/categories/{categoryId}/recipes", async (AppDbContext db, int categoryId) =>
{
    var recipes = await db.Recipes
                          .Where(r => r.CategoryId == categoryId)
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Endpoint: Search Recipes by Name or Ingredient
app.MapGet("/recipes/search", async (AppDbContext db, string query) =>
{
    var recipes = await db.Recipes
                          .Where(r => r.Name.Contains(query))
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Endpoint: Create a New Recipe
app.MapPost("/recipes", async (AppDbContext db, Recipe recipe) =>
{
    db.Recipes.Add(recipe);
    await db.SaveChangesAsync();
    return Results.Created($"/recipes/{recipe.Id}", recipe);
});

// Endpoint: Update an Existing Recipe
app.MapPut("/recipes/{id}", async (AppDbContext db, int id, Recipe updatedRecipe) =>
{
    var recipe = await db.Recipes.FindAsync(id);
    if (recipe == null)
    {
        return Results.NotFound("Recipe not found");
    }

    recipe.Name = updatedRecipe.Name;
    recipe.CategoryId = updatedRecipe.CategoryId;
    recipe.Ingredients = updatedRecipe.Ingredients;
    recipe.Instructions = updatedRecipe.Instructions;

    await db.SaveChangesAsync();
    return Results.Ok(recipe);
});

// Endpoint: Delete a Recipe
app.MapDelete("/recipes/{id}", async (AppDbContext db, int id) =>
{
    var recipe = await db.Recipes.FindAsync(id);
    if (recipe == null)
    {
        return Results.NotFound("Recipe not found");
    }

    db.Recipes.Remove(recipe);
    await db.SaveChangesAsync();
    return Results.Ok("Recipe deleted");
});

// Endpoint: Chatbot using OpenAI GPT
app.MapPost("/chat", async (IOpenAIService openAIService, HttpContext context) =>
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

app.Run();

// ChatRequest model
public class ChatRequest
{
    public string Message { get; set; } = string.Empty; // Default value added
}
