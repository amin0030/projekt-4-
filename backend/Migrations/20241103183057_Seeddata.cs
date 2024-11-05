using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Seeddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "Instructions",
                table: "Recipes",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ingredients_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Instructions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Step = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RecipeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Instructions_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Breakfast" },
                    { 2, "Lunch" },
                    { 3, "Dinner" },
                    { 4, "Dessert" }
                });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "CategoryId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 1, "", "Pancakes" },
                    { 2, 2, "", "Grilled Cheese Sandwich" },
                    { 3, 3, "", "Spaghetti Carbonara" },
                    { 4, 2, "", "Caesar Salad" },
                    { 5, 1, "", "Omelette" },
                    { 6, 1, "", "French Toast" },
                    { 7, 4, "", "Chocolate Cake" },
                    { 8, 4, "", "Apple Pie" },
                    { 9, 3, "", "Tacos" },
                    { 10, 3, "", "Chicken Curry" },
                    { 11, 3, "", "Beef Stew" },
                    { 12, 2, "", "Fish and Chips" },
                    { 13, 2, "", "Mushroom Soup" },
                    { 14, 3, "", "Roast Chicken" },
                    { 15, 1, "", "Waffles" },
                    { 16, 2, "", "Pasta Salad" },
                    { 17, 3, "", "BBQ Ribs" },
                    { 18, 3, "", "Steak" },
                    { 19, 4, "", "Fruit Salad" },
                    { 20, 4, "", "Banana Bread" }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Name", "Quantity", "RecipeId", "Unit" },
                values: new object[,]
                {
                    { 1, "Flour", "1 cup", 1, null },
                    { 2, "Milk", "1 cup", 1, null },
                    { 3, "Egg", "1", 1, null },
                    { 4, "Sugar", "1 tbsp", 1, null },
                    { 5, "Butter", "1 tbsp", 1, null },
                    { 6, "Bread", "2 slices", 2, null },
                    { 7, "Cheese", "2 slices", 2, null },
                    { 8, "Butter", "1 tbsp", 2, null },
                    { 9, "Spaghetti", "200g", 3, null },
                    { 10, "Bacon", "100g", 3, null },
                    { 11, "Parmesan Cheese", "50g", 3, null },
                    { 12, "Egg", "1", 3, null },
                    { 13, "Black Pepper", "to taste", 3, null },
                    { 14, "Lettuce", "1 head", 4, null },
                    { 15, "Chicken Breast", "200g", 4, null },
                    { 16, "Croutons", "1/2 cup", 4, null },
                    { 17, "Parmesan Cheese", "1/4 cup", 4, null },
                    { 18, "Caesar Dressing", "3 tbsp", 4, null },
                    { 19, "Eggs", "2", 5, null },
                    { 20, "Salt", "Pinch", 5, null },
                    { 21, "Pepper", "Pinch", 5, null },
                    { 22, "Butter", "1 tbsp", 5, null },
                    { 23, "Bread", "2 slices", 6, null },
                    { 24, "Egg", "1", 6, null },
                    { 25, "Milk", "1/4 cup", 6, null },
                    { 26, "Sugar", "1 tbsp", 6, null },
                    { 27, "Butter", "1 tbsp", 6, null },
                    { 28, "Flour", "1 1/2 cups", 7, null },
                    { 29, "Sugar", "1 cup", 7, null },
                    { 30, "Cocoa Powder", "1/2 cup", 7, null },
                    { 31, "Baking Powder", "1 tsp", 7, null },
                    { 32, "Eggs", "2", 7, null },
                    { 33, "Butter", "1/2 cup", 7, null },
                    { 34, "Milk", "1 cup", 7, null },
                    { 35, "Apples", "4, peeled and sliced", 8, null },
                    { 36, "Sugar", "1/2 cup", 8, null },
                    { 37, "Cinnamon", "1 tsp", 8, null },
                    { 38, "Pie Crust", "1", 8, null },
                    { 39, "Ground Beef", "200g", 9, null },
                    { 40, "Taco Seasoning", "1 packet", 9, null },
                    { 41, "Tortillas", "4", 9, null },
                    { 42, "Lettuce", "1/2 cup, shredded", 9, null },
                    { 43, "Cheese", "1/4 cup, shredded", 9, null },
                    { 44, "Chicken Breast", "200g", 10, null },
                    { 45, "Curry Powder", "1 tbsp", 10, null },
                    { 46, "Coconut Milk", "1 cup", 10, null },
                    { 47, "Onion", "1, chopped", 10, null },
                    { 48, "Garlic", "2 cloves, minced", 10, null },
                    { 49, "Beef", "500g, cubed", 11, null },
                    { 50, "Potatoes", "2, diced", 11, null },
                    { 51, "Carrots", "2, sliced", 11, null },
                    { 52, "Onion", "1, chopped", 11, null },
                    { 53, "Beef Broth", "2 cups", 11, null },
                    { 54, "Fish Fillets", "2", 12, null },
                    { 55, "Potatoes", "2, sliced", 12, null },
                    { 56, "Flour", "1/2 cup", 12, null },
                    { 57, "Salt", "to taste", 12, null },
                    { 58, "Vegetable Oil", "for frying", 12, null },
                    { 59, "Mushrooms", "200g, sliced", 13, null },
                    { 60, "Onion", "1, chopped", 13, null },
                    { 61, "Garlic", "1 clove, minced", 13, null },
                    { 62, "Cream", "1 cup", 13, null },
                    { 63, "Vegetable Broth", "1 cup", 13, null },
                    { 64, "Whole Chicken", "1", 14, null },
                    { 65, "Salt", "1 tbsp", 14, null },
                    { 66, "Black Pepper", "1 tsp", 14, null },
                    { 67, "Garlic", "3 cloves, minced", 14, null },
                    { 68, "Olive Oil", "2 tbsp", 14, null },
                    { 69, "Rosemary", "2 sprigs", 14, null },
                    { 70, "Flour", "2 cups", 15, null },
                    { 71, "Sugar", "1/4 cup", 15, null },
                    { 72, "Baking Powder", "2 tsp", 15, null },
                    { 73, "Eggs", "2", 15, null },
                    { 74, "Milk", "1 1/2 cups", 15, null },
                    { 75, "Butter", "1/2 cup, melted", 15, null },
                    { 76, "Pasta", "200g", 16, null },
                    { 77, "Cherry Tomatoes", "1 cup, halved", 16, null },
                    { 78, "Cucumber", "1, diced", 16, null },
                    { 79, "Olives", "1/4 cup, sliced", 16, null },
                    { 80, "Feta Cheese", "1/2 cup, crumbled", 16, null },
                    { 81, "Olive Oil", "2 tbsp", 16, null },
                    { 82, "Lemon Juice", "1 tbsp", 16, null },
                    { 83, "Pork Ribs", "1 rack", 17, null },
                    { 84, "BBQ Sauce", "1 cup", 17, null },
                    { 85, "Salt", "to taste", 17, null },
                    { 86, "Black Pepper", "to taste", 17, null },
                    { 87, "Garlic Powder", "1 tsp", 17, null },
                    { 88, "Beef Steak", "1", 18, null },
                    { 89, "Salt", "to taste", 18, null },
                    { 90, "Black Pepper", "to taste", 18, null },
                    { 91, "Olive Oil", "1 tbsp", 18, null },
                    { 92, "Butter", "1 tbsp", 18, null },
                    { 93, "Garlic", "1 clove, smashed", 18, null },
                    { 94, "Apple", "1, diced", 19, null },
                    { 95, "Banana", "1, sliced", 19, null },
                    { 96, "Grapes", "1/2 cup", 19, null },
                    { 97, "Orange", "1, segmented", 19, null },
                    { 98, "Strawberries", "1/2 cup, sliced", 19, null },
                    { 99, "Honey", "1 tbsp", 19, null },
                    { 100, "Mint Leaves", "for garnish", 19, null },
                    { 101, "Bananas", "3, mashed", 20, null },
                    { 102, "Flour", "1 1/2 cups", 20, null },
                    { 103, "Sugar", "1/2 cup", 20, null },
                    { 104, "Baking Soda", "1 tsp", 20, null },
                    { 105, "Salt", "1/4 tsp", 20, null },
                    { 106, "Egg", "1", 20, null },
                    { 107, "Butter", "1/3 cup, melted", 20, null }
                });

            migrationBuilder.InsertData(
                table: "Instructions",
                columns: new[] { "Id", "Description", "RecipeId", "Step" },
                values: new object[,]
                {
                    { 1, "Mix flour and milk.", 1, 1 },
                    { 2, "Add egg and whisk.", 1, 2 },
                    { 3, "Pour batter onto hot griddle and cook until golden brown.", 1, 3 },
                    { 4, "Butter one side of each bread slice.", 2, 1 },
                    { 5, "Place cheese between slices.", 2, 2 },
                    { 6, "Grill sandwich until golden brown on both sides.", 2, 3 },
                    { 7, "Boil spaghetti in salted water until al dente.", 3, 1 },
                    { 8, "Cook bacon until crispy.", 3, 2 },
                    { 9, "Mix cooked spaghetti with bacon, egg, and Parmesan cheese.", 3, 3 },
                    { 10, "Chop lettuce and cook chicken breast.", 4, 1 },
                    { 11, "Combine lettuce, chicken, croutons, and Parmesan cheese.", 4, 2 },
                    { 12, "Drizzle Caesar dressing and toss well.", 4, 3 },
                    { 13, "Crack eggs into a bowl, season with salt and pepper, and whisk.", 5, 1 },
                    { 14, "Melt butter in a skillet over medium heat.", 5, 2 },
                    { 15, "Pour eggs into the skillet and cook until set, folding gently.", 5, 3 },
                    { 16, "Whisk egg, milk, and sugar in a bowl.", 6, 1 },
                    { 17, "Dip each bread slice in the egg mixture.", 6, 2 },
                    { 18, "Cook bread slices in a hot skillet until golden on both sides.", 6, 3 },
                    { 19, "Preheat oven to 180°C (350°F). Grease and flour a cake pan.", 7, 1 },
                    { 20, "Mix flour, sugar, cocoa powder, and baking powder.", 7, 2 },
                    { 21, "Add eggs, butter, and milk, and mix until smooth.", 7, 3 },
                    { 22, "Pour batter into pan and bake for 30–35 minutes.", 7, 4 },
                    { 23, "Preheat oven to 200°C (400°F).", 8, 1 },
                    { 24, "Combine apples, sugar, and cinnamon.", 8, 2 },
                    { 25, "Pour apple mixture into pie crust and cover with top crust.", 8, 3 },
                    { 26, "Bake for 45 minutes or until crust is golden.", 8, 4 },
                    { 27, "Cook ground beef with taco seasoning until browned.", 9, 1 },
                    { 28, "Warm tortillas in a skillet.", 9, 2 },
                    { 29, "Assemble tacos with beef, lettuce, and cheese.", 9, 3 },
                    { 30, "Sauté onion and garlic in a pot until softened.", 10, 1 },
                    { 31, "Add chicken and curry powder; cook until browned.", 10, 2 },
                    { 32, "Pour in coconut milk and simmer until chicken is cooked through.", 10, 3 },
                    { 33, "Brown beef cubes in a pot.", 11, 1 },
                    { 34, "Add potatoes, carrots, onion, and beef broth.", 11, 2 },
                    { 35, "Simmer until vegetables and beef are tender.", 11, 3 },
                    { 36, "Coat fish fillets in flour, salt, and pepper.", 12, 1 },
                    { 37, "Fry fish and potato slices in hot oil until golden.", 12, 2 },
                    { 38, "Sauté mushrooms, onion, and garlic until softened.", 13, 1 },
                    { 39, "Add broth and cream; simmer until flavors blend.", 13, 2 },
                    { 40, "Preheat oven to 180°C (350°F). Season chicken.", 14, 1 },
                    { 41, "Roast chicken for 1 hour or until juices run clear.", 14, 2 },
                    { 42, "Preheat waffle iron.", 15, 1 },
                    { 43, "Mix flour, sugar, baking powder, eggs, milk, and butter.", 15, 2 },
                    { 44, "Cook batter in waffle iron until golden.", 15, 3 },
                    { 45, "Boil pasta until al dente; drain and cool.", 16, 1 },
                    { 46, "Combine pasta, vegetables, cheese, olive oil, and lemon juice.", 16, 2 },
                    { 47, "Season ribs and cook in a preheated oven at 150°C for 2 hours.", 17, 1 },
                    { 48, "Brush ribs with BBQ sauce and cook until caramelized.", 17, 2 },
                    { 49, "Season steak with salt and pepper.", 18, 1 },
                    { 50, "Sear steak in hot skillet with butter and garlic until desired doneness.", 18, 2 },
                    { 51, "Combine all fruits in a bowl.", 19, 1 },
                    { 52, "Drizzle with honey and garnish with mint leaves.", 19, 2 },
                    { 53, "Preheat oven to 175°C (350°F).", 20, 1 },
                    { 54, "Mix mashed bananas, flour, sugar, baking soda, salt, egg, and butter.", 20, 2 },
                    { 55, "Pour batter into loaf pan and bake for 60 minutes.", 20, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_RecipeId",
                table: "Ingredients",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Instructions_RecipeId",
                table: "Instructions",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Instructions");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes");

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Recipes",
                newName: "Instructions");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
