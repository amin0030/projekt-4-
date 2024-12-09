using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "/Pictures/pancakes.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://www.cookingclassy.com/wp-content/uploads/2019/10/spag..hetti-carbonara-20.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Image",
                value: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/04/Fluffy-Pancake-Recipe.jpg");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Image",
                value: "https://www.cookingclassy.com/wp-content/uploads/2019/10/spaghetti-carbonara-20.jpg");
        }
    }
}
