using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalRescue.DataAccess.Migrations
{
    public partial class AddViolationCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ViolationCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsEnabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViolationCategories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ViolationCategories_Name",
                table: "ViolationCategories",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ViolationCategories");
        }
    }
}
