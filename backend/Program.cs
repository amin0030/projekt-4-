// Program.cs
using Projekt4;
using Projekt4.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configure the server to listen on all network interfaces
builder.WebHost.UseUrls("http://0.0.0.0:5224");

// Add database context with SQL Server connection and enable retry on failure
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure()));

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

// Enable Swagger middleware in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Projekt4 API v1");
        options.RoutePrefix = string.Empty;
    });
}

// Enable CORS with the "AllowAll" policy
app.UseCors("AllowAll");

// Endpoint for user registration
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

// Endpoint for user login
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

// Endpoint to get all recipes
app.MapGet("/recipes", async (AppDbContext db) =>
{
    var recipes = await db.Recipes
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Endpoint to get a specific recipe by ID
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

// Endpoint to get all categories
app.MapGet("/categories", async (AppDbContext db) =>
{
    var categories = await db.Categories.ToListAsync();
    return Results.Ok(categories);
});

// Endpoint to get recipes by category ID
app.MapGet("/categories/{categoryId}/recipes", async (AppDbContext db, int categoryId) =>
{
    var recipes = await db.Recipes
                          .Where(r => r.CategoryId == categoryId)
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Endpoint to search for recipes by name or ingredient
app.MapGet("/recipes/search", async (AppDbContext db, string query) =>
{
    var recipes = await db.Recipes
                          .Where(r => r.Name.Contains(query))
                          .Include(r => r.Ingredients)
                          .Include(r => r.Instructions)
                          .ToListAsync();

    return Results.Ok(recipes);
});

// Enable routing and map controllers (if you have any controller classes)
app.MapControllers();

app.Run();
