using Microsoft.EntityFrameworkCore;

namespace Projekt4.Models
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // Seed categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Breakfast" },
                new Category { Id = 2, Name = "Lunch" },
                new Category { Id = 3, Name = "Dinner" },
                new Category { Id = 4, Name = "Dessert" }
            );

            // Seed recipes
modelBuilder.Entity<Recipe>().HasData(
    new Recipe { Id = 1, Name = "Pancakes", CategoryId = 1, Image = "/Pictures/pancakes.jpg" },
    new Recipe { Id = 2, Name = "Grilled Cheese Sandwich", CategoryId = 2, Image = "/Pictures/grilledcheese.jpg" },
    new Recipe { Id = 3, Name = "Spaghetti Carbonara", CategoryId = 3, Image = "/Pictures/carbonara.jpg" },
    new Recipe { Id = 4, Name = "Caesar Salad", CategoryId = 2, Image = "/Pictures/caesarsalad.jpg" },
    new Recipe { Id = 5, Name = "Omelette", CategoryId = 1, Image = "/Pictures/omelette.jpg" },
    new Recipe { Id = 6, Name = "French Toast", CategoryId = 1, Image = "/Pictures/FrenchToast.jpg" },
    new Recipe { Id = 7, Name = "Chocolate Cake", CategoryId = 4, Image = "/Pictures/cake.jpg" },
    new Recipe { Id = 8, Name = "Apple Pie", CategoryId = 4, Image = "/Pictures/applepie.jpg" },
    new Recipe { Id = 9, Name = "Tacos", CategoryId = 3, Image = "/Pictures/tacos.jpg" },
    new Recipe { Id = 10, Name = "Chicken Curry", CategoryId = 3, Image = "/Pictures/chickencurry.jpg" },
    new Recipe { Id = 11, Name = "Beef Stew", CategoryId = 3, Image = "/Pictures/beefstew.jpg" },
    new Recipe { Id = 12, Name = "Fish and Chips", CategoryId = 2, Image = "/Pictures/FishChips.jpg" },
    new Recipe { Id = 13, Name = "Mushroom Soup", CategoryId = 2, Image = "/Pictures/Mushroom.jpg" },
    new Recipe { Id = 14, Name = "Roast Chicken", CategoryId = 3, Image = "/Pictures/chicken.jpg" },
    new Recipe { Id = 15, Name = "Waffles", CategoryId = 1, Image = "/Pictures/233920-Tender-Waffles.jpg" },
    new Recipe { Id = 16, Name = "Pasta Salad", CategoryId = 2, Image = "/Pictures/PastaSalad.jpg" },
    new Recipe { Id = 17, Name = "BBQ Ribs", CategoryId = 3, Image = "/Pictures/BBQribs.jpg" },
    new Recipe { Id = 18, Name = "Steak", CategoryId = 3, Image = "/Pictures/steak.jpg" },
    new Recipe { Id = 19, Name = "Fruit Salad", CategoryId = 4, Image = "/Pictures/fruitsalad.jpg" },
    new Recipe { Id = 20, Name = "Banana Bread", CategoryId = 4, Image = "/Pictures/bananabread.jpg" }
);




            // Seed ingredients
            modelBuilder.Entity<Ingredient>().HasData(
                // Pancakes (RecipeId = 1)
                new Ingredient { Id = 1, Name = "Flour", Quantity = "1 cup", RecipeId = 1 },
                new Ingredient { Id = 2, Name = "Milk", Quantity = "1 cup", RecipeId = 1 },
                new Ingredient { Id = 3, Name = "Egg", Quantity = "1", RecipeId = 1 },
                new Ingredient { Id = 4, Name = "Sugar", Quantity = "1 tbsp", RecipeId = 1 },
                new Ingredient { Id = 5, Name = "Butter", Quantity = "1 tbsp", RecipeId = 1 },

                // Grilled Cheese Sandwich (RecipeId = 2)
                new Ingredient { Id = 6, Name = "Bread", Quantity = "2 slices", RecipeId = 2 },
                new Ingredient { Id = 7, Name = "Cheese", Quantity = "2 slices", RecipeId = 2 },
                new Ingredient { Id = 8, Name = "Butter", Quantity = "1 tbsp", RecipeId = 2 },

                // Spaghetti Carbonara (RecipeId = 3)
                new Ingredient { Id = 9, Name = "Spaghetti", Quantity = "200g", RecipeId = 3 },
                new Ingredient { Id = 10, Name = "Bacon", Quantity = "100g", RecipeId = 3 },
                new Ingredient { Id = 11, Name = "Parmesan Cheese", Quantity = "50g", RecipeId = 3 },
                new Ingredient { Id = 12, Name = "Egg", Quantity = "1", RecipeId = 3 },
                new Ingredient { Id = 13, Name = "Black Pepper", Quantity = "to taste", RecipeId = 3 },

                // Caesar Salad (RecipeId = 4)
                new Ingredient { Id = 14, Name = "Lettuce", Quantity = "1 head", RecipeId = 4 },
                new Ingredient { Id = 15, Name = "Chicken Breast", Quantity = "200g", RecipeId = 4 },
                new Ingredient { Id = 16, Name = "Croutons", Quantity = "1/2 cup", RecipeId = 4 },
                new Ingredient { Id = 17, Name = "Parmesan Cheese", Quantity = "1/4 cup", RecipeId = 4 },
                new Ingredient { Id = 18, Name = "Caesar Dressing", Quantity = "3 tbsp", RecipeId = 4 },

                // Omelette (RecipeId = 5)
                new Ingredient { Id = 19, Name = "Eggs", Quantity = "2", RecipeId = 5 },
                new Ingredient { Id = 20, Name = "Salt", Quantity = "Pinch", RecipeId = 5 },
                new Ingredient { Id = 21, Name = "Pepper", Quantity = "Pinch", RecipeId = 5 },
                new Ingredient { Id = 22, Name = "Butter", Quantity = "1 tbsp", RecipeId = 5 },

                // French Toast (RecipeId = 6)
                new Ingredient { Id = 23, Name = "Bread", Quantity = "2 slices", RecipeId = 6 },
                new Ingredient { Id = 24, Name = "Egg", Quantity = "1", RecipeId = 6 },
                new Ingredient { Id = 25, Name = "Milk", Quantity = "1/4 cup", RecipeId = 6 },
                new Ingredient { Id = 26, Name = "Sugar", Quantity = "1 tbsp", RecipeId = 6 },
                new Ingredient { Id = 27, Name = "Butter", Quantity = "1 tbsp", RecipeId = 6 },

                // Chocolate Cake (RecipeId = 7)
                new Ingredient { Id = 28, Name = "Flour", Quantity = "1 1/2 cups", RecipeId = 7 },
                new Ingredient { Id = 29, Name = "Sugar", Quantity = "1 cup", RecipeId = 7 },
                new Ingredient { Id = 30, Name = "Cocoa Powder", Quantity = "1/2 cup", RecipeId = 7 },
                new Ingredient { Id = 31, Name = "Baking Powder", Quantity = "1 tsp", RecipeId = 7 },
                new Ingredient { Id = 32, Name = "Eggs", Quantity = "2", RecipeId = 7 },
                new Ingredient { Id = 33, Name = "Butter", Quantity = "1/2 cup", RecipeId = 7 },
                new Ingredient { Id = 34, Name = "Milk", Quantity = "1 cup", RecipeId = 7 },

                // Apple Pie (RecipeId = 8)
                new Ingredient { Id = 35, Name = "Apples", Quantity = "4, peeled and sliced", RecipeId = 8 },
                new Ingredient { Id = 36, Name = "Sugar", Quantity = "1/2 cup", RecipeId = 8 },
                new Ingredient { Id = 37, Name = "Cinnamon", Quantity = "1 tsp", RecipeId = 8 },
                new Ingredient { Id = 38, Name = "Pie Crust", Quantity = "1", RecipeId = 8 },

                // Tacos (RecipeId = 9)
                new Ingredient { Id = 39, Name = "Ground Beef", Quantity = "200g", RecipeId = 9 },
                new Ingredient { Id = 40, Name = "Taco Seasoning", Quantity = "1 packet", RecipeId = 9 },
                new Ingredient { Id = 41, Name = "Tortillas", Quantity = "4", RecipeId = 9 },
                new Ingredient { Id = 42, Name = "Lettuce", Quantity = "1/2 cup, shredded", RecipeId = 9 },
                new Ingredient { Id = 43, Name = "Cheese", Quantity = "1/4 cup, shredded", RecipeId = 9 },

                // Chicken Curry (RecipeId = 10)
                new Ingredient { Id = 44, Name = "Chicken Breast", Quantity = "200g", RecipeId = 10 },
                new Ingredient { Id = 45, Name = "Curry Powder", Quantity = "1 tbsp", RecipeId = 10 },
                new Ingredient { Id = 46, Name = "Coconut Milk", Quantity = "1 cup", RecipeId = 10 },
                new Ingredient { Id = 47, Name = "Onion", Quantity = "1, chopped", RecipeId = 10 },
                new Ingredient { Id = 48, Name = "Garlic", Quantity = "2 cloves, minced", RecipeId = 10 },

                // Beef Stew (RecipeId = 11)
                new Ingredient { Id = 49, Name = "Beef", Quantity = "500g, cubed", RecipeId = 11 },
                new Ingredient { Id = 50, Name = "Potatoes", Quantity = "2, diced", RecipeId = 11 },
                new Ingredient { Id = 51, Name = "Carrots", Quantity = "2, sliced", RecipeId = 11 },
                new Ingredient { Id = 52, Name = "Onion", Quantity = "1, chopped", RecipeId = 11 },
                new Ingredient { Id = 53, Name = "Beef Broth", Quantity = "2 cups", RecipeId = 11 },

                // Fish and Chips (RecipeId = 12)
                new Ingredient { Id = 54, Name = "Fish Fillets", Quantity = "2", RecipeId = 12 },
                new Ingredient { Id = 55, Name = "Potatoes", Quantity = "2, sliced", RecipeId = 12 },
                new Ingredient { Id = 56, Name = "Flour", Quantity = "1/2 cup", RecipeId = 12 },
                new Ingredient { Id = 57, Name = "Salt", Quantity = "to taste", RecipeId = 12 },
                new Ingredient { Id = 58, Name = "Vegetable Oil", Quantity = "for frying", RecipeId = 12 },

                // Mushroom Soup (RecipeId = 13)
                new Ingredient { Id = 59, Name = "Mushrooms", Quantity = "200g, sliced", RecipeId = 13 },
                new Ingredient { Id = 60, Name = "Onion", Quantity = "1, chopped", RecipeId = 13 },
                new Ingredient { Id = 61, Name = "Garlic", Quantity = "1 clove, minced", RecipeId = 13 },
                new Ingredient { Id = 62, Name = "Cream", Quantity = "1 cup", RecipeId = 13 },
                new Ingredient { Id = 63, Name = "Vegetable Broth", Quantity = "1 cup", RecipeId = 13 },

                // Roast Chicken (RecipeId = 14)
                new Ingredient { Id = 64, Name = "Whole Chicken", Quantity = "1", RecipeId = 14 },
                new Ingredient { Id = 65, Name = "Salt", Quantity = "1 tbsp", RecipeId = 14 },
                new Ingredient { Id = 66, Name = "Black Pepper", Quantity = "1 tsp", RecipeId = 14 },
                new Ingredient { Id = 67, Name = "Garlic", Quantity = "3 cloves, minced", RecipeId = 14 },
                new Ingredient { Id = 68, Name = "Olive Oil", Quantity = "2 tbsp", RecipeId = 14 },
                new Ingredient { Id = 69, Name = "Rosemary", Quantity = "2 sprigs", RecipeId = 14 },

                // Waffles (RecipeId = 15)
                new Ingredient { Id = 70, Name = "Flour", Quantity = "2 cups", RecipeId = 15 },
                new Ingredient { Id = 71, Name = "Sugar", Quantity = "1/4 cup", RecipeId = 15 },
                new Ingredient { Id = 72, Name = "Baking Powder", Quantity = "2 tsp", RecipeId = 15 },
                new Ingredient { Id = 73, Name = "Eggs", Quantity = "2", RecipeId = 15 },
                new Ingredient { Id = 74, Name = "Milk", Quantity = "1 1/2 cups", RecipeId = 15 },
                new Ingredient { Id = 75, Name = "Butter", Quantity = "1/2 cup, melted", RecipeId = 15 },

                // Pasta Salad (RecipeId = 16)
                new Ingredient { Id = 76, Name = "Pasta", Quantity = "200g", RecipeId = 16 },
                new Ingredient { Id = 77, Name = "Cherry Tomatoes", Quantity = "1 cup, halved", RecipeId = 16 },
                new Ingredient { Id = 78, Name = "Cucumber", Quantity = "1, diced", RecipeId = 16 },
                new Ingredient { Id = 79, Name = "Olives", Quantity = "1/4 cup, sliced", RecipeId = 16 },
                new Ingredient { Id = 80, Name = "Feta Cheese", Quantity = "1/2 cup, crumbled", RecipeId = 16 },
                new Ingredient { Id = 81, Name = "Olive Oil", Quantity = "2 tbsp", RecipeId = 16 },
                new Ingredient { Id = 82, Name = "Lemon Juice", Quantity = "1 tbsp", RecipeId = 16 },

                // BBQ Ribs (RecipeId = 17)
                new Ingredient { Id = 83, Name = "Pork Ribs", Quantity = "1 rack", RecipeId = 17 },
                new Ingredient { Id = 84, Name = "BBQ Sauce", Quantity = "1 cup", RecipeId = 17 },
                new Ingredient { Id = 85, Name = "Salt", Quantity = "to taste", RecipeId = 17 },
                new Ingredient { Id = 86, Name = "Black Pepper", Quantity = "to taste", RecipeId = 17 },
                new Ingredient { Id = 87, Name = "Garlic Powder", Quantity = "1 tsp", RecipeId = 17 },

                // Steak (RecipeId = 18)
                new Ingredient { Id = 88, Name = "Beef Steak", Quantity = "1", RecipeId = 18 },
                new Ingredient { Id = 89, Name = "Salt", Quantity = "to taste", RecipeId = 18 },
                new Ingredient { Id = 90, Name = "Black Pepper", Quantity = "to taste", RecipeId = 18 },
                new Ingredient { Id = 91, Name = "Olive Oil", Quantity = "1 tbsp", RecipeId = 18 },
                new Ingredient { Id = 92, Name = "Butter", Quantity = "1 tbsp", RecipeId = 18 },
                new Ingredient { Id = 93, Name = "Garlic", Quantity = "1 clove, smashed", RecipeId = 18 },

                // Fruit Salad (RecipeId = 19)
                new Ingredient { Id = 94, Name = "Apple", Quantity = "1, diced", RecipeId = 19 },
                new Ingredient { Id = 95, Name = "Banana", Quantity = "1, sliced", RecipeId = 19 },
                new Ingredient { Id = 96, Name = "Grapes", Quantity = "1/2 cup", RecipeId = 19 },
                new Ingredient { Id = 97, Name = "Orange", Quantity = "1, segmented", RecipeId = 19 },
                new Ingredient { Id = 98, Name = "Strawberries", Quantity = "1/2 cup, sliced", RecipeId = 19 },
                new Ingredient { Id = 99, Name = "Honey", Quantity = "1 tbsp", RecipeId = 19 },
                new Ingredient { Id = 100, Name = "Mint Leaves", Quantity = "for garnish", RecipeId = 19 },

                // Banana Bread (RecipeId = 20)
                new Ingredient { Id = 101, Name = "Bananas", Quantity = "3, mashed", RecipeId = 20 },
                new Ingredient { Id = 102, Name = "Flour", Quantity = "1 1/2 cups", RecipeId = 20 },
                new Ingredient { Id = 103, Name = "Sugar", Quantity = "1/2 cup", RecipeId = 20 },
                new Ingredient { Id = 104, Name = "Baking Soda", Quantity = "1 tsp", RecipeId = 20 },
                new Ingredient { Id = 105, Name = "Salt", Quantity = "1/4 tsp", RecipeId = 20 },
                new Ingredient { Id = 106, Name = "Egg", Quantity = "1", RecipeId = 20 },
                new Ingredient { Id = 107, Name = "Butter", Quantity = "1/3 cup, melted", RecipeId = 20 }

            );


            // Seed instructions
            modelBuilder.Entity<Instruction>().HasData(
                // Pancakes (RecipeId = 1)
                new Instruction { Id = 1, Step = 1, Description = "Mix flour and milk.", RecipeId = 1 },
                new Instruction { Id = 2, Step = 2, Description = "Add egg and whisk.", RecipeId = 1 },
                new Instruction { Id = 3, Step = 3, Description = "Pour batter onto hot griddle and cook until golden brown.", RecipeId = 1 },

                // Grilled Cheese Sandwich (RecipeId = 2)
                new Instruction { Id = 4, Step = 1, Description = "Butter one side of each bread slice.", RecipeId = 2 },
                new Instruction { Id = 5, Step = 2, Description = "Place cheese between slices.", RecipeId = 2 },
                new Instruction { Id = 6, Step = 3, Description = "Grill sandwich until golden brown on both sides.", RecipeId = 2 },

                // Spaghetti Carbonara (RecipeId = 3)
                new Instruction { Id = 7, Step = 1, Description = "Boil spaghetti in salted water until al dente.", RecipeId = 3 },
                new Instruction { Id = 8, Step = 2, Description = "Cook bacon until crispy.", RecipeId = 3 },
                new Instruction { Id = 9, Step = 3, Description = "Mix cooked spaghetti with bacon, egg, and Parmesan cheese.", RecipeId = 3 },

                // Caesar Salad (RecipeId = 4)
                new Instruction { Id = 10, Step = 1, Description = "Chop lettuce and cook chicken breast.", RecipeId = 4 },
                new Instruction { Id = 11, Step = 2, Description = "Combine lettuce, chicken, croutons, and Parmesan cheese.", RecipeId = 4 },
                new Instruction { Id = 12, Step = 3, Description = "Drizzle Caesar dressing and toss well.", RecipeId = 4 },

                // Omelette (RecipeId = 5)
                new Instruction { Id = 13, Step = 1, Description = "Crack eggs into a bowl, season with salt and pepper, and whisk.", RecipeId = 5 },
                new Instruction { Id = 14, Step = 2, Description = "Melt butter in a skillet over medium heat.", RecipeId = 5 },
                new Instruction { Id = 15, Step = 3, Description = "Pour eggs into the skillet and cook until set, folding gently.", RecipeId = 5 },

                // French Toast (RecipeId = 6)
                new Instruction { Id = 16, Step = 1, Description = "Whisk egg, milk, and sugar in a bowl.", RecipeId = 6 },
                new Instruction { Id = 17, Step = 2, Description = "Dip each bread slice in the egg mixture.", RecipeId = 6 },
                new Instruction { Id = 18, Step = 3, Description = "Cook bread slices in a hot skillet until golden on both sides.", RecipeId = 6 },

                // Chocolate Cake (RecipeId = 7)
                new Instruction { Id = 19, Step = 1, Description = "Preheat oven to 180°C (350°F). Grease and flour a cake pan.", RecipeId = 7 },
                new Instruction { Id = 20, Step = 2, Description = "Mix flour, sugar, cocoa powder, and baking powder.", RecipeId = 7 },
                new Instruction { Id = 21, Step = 3, Description = "Add eggs, butter, and milk, and mix until smooth.", RecipeId = 7 },
                new Instruction { Id = 22, Step = 4, Description = "Pour batter into pan and bake for 30–35 minutes.", RecipeId = 7 },

                // Apple Pie (RecipeId = 8)
                new Instruction { Id = 23, Step = 1, Description = "Preheat oven to 200°C (400°F).", RecipeId = 8 },
                new Instruction { Id = 24, Step = 2, Description = "Combine apples, sugar, and cinnamon.", RecipeId = 8 },
                new Instruction { Id = 25, Step = 3, Description = "Pour apple mixture into pie crust and cover with top crust.", RecipeId = 8 },
                new Instruction { Id = 26, Step = 4, Description = "Bake for 45 minutes or until crust is golden.", RecipeId = 8 },

                // Tacos (RecipeId = 9)
                new Instruction { Id = 27, Step = 1, Description = "Cook ground beef with taco seasoning until browned.", RecipeId = 9 },
                new Instruction { Id = 28, Step = 2, Description = "Warm tortillas in a skillet.", RecipeId = 9 },
                new Instruction { Id = 29, Step = 3, Description = "Assemble tacos with beef, lettuce, and cheese.", RecipeId = 9 },

                // Chicken Curry (RecipeId = 10)
                new Instruction { Id = 30, Step = 1, Description = "Sauté onion and garlic in a pot until softened.", RecipeId = 10 },
                new Instruction { Id = 31, Step = 2, Description = "Add chicken and curry powder; cook until browned.", RecipeId = 10 },
                new Instruction { Id = 32, Step = 3, Description = "Pour in coconut milk and simmer until chicken is cooked through.", RecipeId = 10 },

                // Beef Stew (RecipeId = 11)
                new Instruction { Id = 33, Step = 1, Description = "Brown beef cubes in a pot.", RecipeId = 11 },
                new Instruction { Id = 34, Step = 2, Description = "Add potatoes, carrots, onion, and beef broth.", RecipeId = 11 },
                new Instruction { Id = 35, Step = 3, Description = "Simmer until vegetables and beef are tender.", RecipeId = 11 },

                // Fish and Chips (RecipeId = 12)
                new Instruction { Id = 36, Step = 1, Description = "Coat fish fillets in flour, salt, and pepper.", RecipeId = 12 },
                new Instruction { Id = 37, Step = 2, Description = "Fry fish and potato slices in hot oil until golden.", RecipeId = 12 },

                // Mushroom Soup (RecipeId = 13)
                new Instruction { Id = 38, Step = 1, Description = "Sauté mushrooms, onion, and garlic until softened.", RecipeId = 13 },
                new Instruction { Id = 39, Step = 2, Description = "Add broth and cream; simmer until flavors blend.", RecipeId = 13 },

                // Roast Chicken (RecipeId = 14)
                new Instruction { Id = 40, Step = 1, Description = "Preheat oven to 180°C (350°F). Season chicken.", RecipeId = 14 },
                new Instruction { Id = 41, Step = 2, Description = "Roast chicken for 1 hour or until juices run clear.", RecipeId = 14 },

                // Waffles (RecipeId = 15)
                new Instruction { Id = 42, Step = 1, Description = "Preheat waffle iron.", RecipeId = 15 },
                new Instruction { Id = 43, Step = 2, Description = "Mix flour, sugar, baking powder, eggs, milk, and butter.", RecipeId = 15 },
                new Instruction { Id = 44, Step = 3, Description = "Cook batter in waffle iron until golden.", RecipeId = 15 },

                // Pasta Salad (RecipeId = 16)
                new Instruction { Id = 45, Step = 1, Description = "Boil pasta until al dente; drain and cool.", RecipeId = 16 },
                new Instruction { Id = 46, Step = 2, Description = "Combine pasta, vegetables, cheese, olive oil, and lemon juice.", RecipeId = 16 },

                // BBQ Ribs (RecipeId = 17)
                new Instruction { Id = 47, Step = 1, Description = "Season ribs and cook in a preheated oven at 150°C for 2 hours.", RecipeId = 17 },
                new Instruction { Id = 48, Step = 2, Description = "Brush ribs with BBQ sauce and cook until caramelized.", RecipeId = 17 },

                // Steak (RecipeId = 18)
                new Instruction { Id = 49, Step = 1, Description = "Season steak with salt and pepper.", RecipeId = 18 },
                new Instruction { Id = 50, Step = 2, Description = "Sear steak in hot skillet with butter and garlic until desired doneness.", RecipeId = 18 },

                // Fruit Salad (RecipeId = 19)
                new Instruction { Id = 51, Step = 1, Description = "Combine all fruits in a bowl.", RecipeId = 19 },
                new Instruction { Id = 52, Step = 2, Description = "Drizzle with honey and garnish with mint leaves.", RecipeId = 19 },

                // Banana Bread (RecipeId = 20)
                new Instruction { Id = 53, Step = 1, Description = "Preheat oven to 175°C (350°F).", RecipeId = 20 },
                new Instruction { Id = 54, Step = 2, Description = "Mix mashed bananas, flour, sugar, baking soda, salt, egg, and butter.", RecipeId = 20 },
                new Instruction { Id = 55, Step = 3, Description = "Pour batter into loaf pan and bake for 60 minutes.", RecipeId = 20 }
            );

        }
    }
}
