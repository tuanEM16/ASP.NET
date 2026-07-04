using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBannerManagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Subtitle = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ButtonText = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TargetType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    TargetValue = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Banners",
                columns: new[] { "Id", "ButtonText", "CreatedDate", "DisplayOrder", "ImageUrl", "IsActive", "Subtitle", "TargetType", "TargetValue", "Title" },
                values: new object[,]
                {
                    { 1, "Khám phá kính râm", new DateTime(2026, 7, 4, 0, 0, 0, 0, DateTimeKind.Utc), 1, "/images/eyewear/skyline-blue.jpg", true, "Bảo vệ đôi mắt và hoàn thiện phong cách với bộ sưu tập kính râm mới.", "products", null, "Kính râm chuẩn UV400" },
                    { 2, "Xem sản phẩm", new DateTime(2026, 7, 4, 0, 0, 0, 0, DateTimeKind.Utc), 2, "/images/eyewear/luna-cat-eye.jpg", true, "Thiết kế mắt mèo sắc nét dành cho phong cách thanh lịch và nổi bật.", "product", "5", "Luna Cat-Eye Black" },
                    { 3, "Chọn gọng kính", new DateTime(2026, 7, 4, 0, 0, 0, 0, DateTimeKind.Utc), 3, "/images/eyewear/urban-clear.jpg", true, "Gọng kính nhẹ, hiện đại và phù hợp nhiều kiểu khuôn mặt.", "products", null, "Gọng kính thời trang 2026" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");
        }
    }
}
