using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalRescue.DataAccess.Migrations
{
    public partial class MediaContent_AddContentType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "MediaContent",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "MediaContent");
        }
    }
}
