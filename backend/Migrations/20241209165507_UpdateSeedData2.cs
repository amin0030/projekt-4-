using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "/Pictures/grilledcheese.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "/Pictures/carbonara.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "/Pictures/caesarsalad.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "/Pictures/omelette.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "/Pictures/FrenchToast.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "/Pictures/cake.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: "/Pictures/applepie.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: "/Pictures/tacos.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: "/Pictures/chickencurry.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 11,
                column: "Image",
                value: "/Pictures/beefstew.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 12,
                column: "Image",
                value: "/Pictures/FishChips.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 13,
                column: "Image",
                value: "/Pictures/Mushroom.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 14,
                column: "Image",
                value: "/Pictures/chicken.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 15,
                column: "Image",
                value: "/Pictures/233920-Tender-Waffles.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 16,
                column: "Image",
                value: "/Pictures/PastaSalad.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 17,
                column: "Image",
                value: "/Pictures/BBQribs.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 18,
                column: "Image",
                value: "/Pictures/steak.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 19,
                column: "Image",
                value: "/Pictures/fruitsalad.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 20,
                column: "Image",
                value: "/Pictures/bananabread.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Image",
                value: "https://www.tasteofhome.com/wp-content/uploads/2018/12/The-Best-Ever-Grilled-Cheese-Sandwiches_EXPS_SDFM19_90781_C10_19_4b-2.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://www.cookingclassy.com/wp-content/uploads/2019/10/spag..hetti-carbonara-20.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 4,
                column: "Image",
                value: "https://www.loveandlemons.com/wp-content/uploads/2020/03/caesar-salad.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 5,
                column: "Image",
                value: "https://www.cookist.com/wp-content/uploads/2019/01/omelette-638x425.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 6,
                column: "Image",
                value: "https://www.mccormick.com/-/media/mccormick-us/recipes/mccormick/q/2000/quick-and-easy-french-toast.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 7,
                column: "Image",
                value: "https://www.crazyforcrust.com/wp-content/uploads/2020/05/easy-fluffy-pancakes-5-of-12.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 8,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 9,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 10,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 11,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 12,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 13,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 14,
                column: "Image",
                value: "https://www.eatwell101.com/wp-content/uploads/2019/11/Roasted-Chicken-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 15,
                column: "Image",
                value: "https://www.crazyforcrust.com/wp-content/uploads/2020/05/easy-fluffy-pancakes-5-of-12.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 16,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 17,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 18,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 19,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 20,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");
        }
    }
}
