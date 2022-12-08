using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AnimalRescue.DataAccess.Migrations
{
    public partial class FixMediaContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_MediaContent_MediaContentId",
                table: "Articles");

            migrationBuilder.DropTable(
                name: "MediaContent");

            migrationBuilder.DropIndex(
                name: "IX_Articles_MediaContentId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "MediaContentId",
                table: "Articles");

            migrationBuilder.CreateTable(
                name: "ArticleMediaContent",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelativePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleMediaContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleMediaContent_Articles_Id",
                        column: x => x.Id,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ViolationMediaContent",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ViolationId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelativePath = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViolationMediaContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ViolationMediaContent_LiteViolations_ViolationId",
                        column: x => x.ViolationId,
                        principalTable: "LiteViolations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ViolationMediaContent_ViolationId",
                table: "ViolationMediaContent",
                column: "ViolationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleMediaContent");

            migrationBuilder.DropTable(
                name: "ViolationMediaContent");

            migrationBuilder.AddColumn<Guid>(
                name: "MediaContentId",
                table: "Articles",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MediaContent",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RelativePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ViolationId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaContent_LiteViolations_ViolationId",
                        column: x => x.ViolationId,
                        principalTable: "LiteViolations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Articles_MediaContentId",
                table: "Articles",
                column: "MediaContentId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaContent_ViolationId",
                table: "MediaContent",
                column: "ViolationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_MediaContent_MediaContentId",
                table: "Articles",
                column: "MediaContentId",
                principalTable: "MediaContent",
                principalColumn: "Id");
        }
    }
}
