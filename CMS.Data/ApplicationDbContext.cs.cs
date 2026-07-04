using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;

namespace CMS.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Khai báo các bảng dữ liệu
        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CategoryProduct> CategoriesProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Banner> Banners { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Banner>().HasData(
                new Banner
                {
                    Id = 1,
                    Title = "Kính râm chuẩn UV400",
                    Subtitle = "Bảo vệ đôi mắt và hoàn thiện phong cách với bộ sưu tập kính râm mới.",
                    ImageUrl = "/images/eyewear/skyline-blue.jpg",
                    ButtonText = "Khám phá kính râm",
                    TargetType = "products",
                    DisplayOrder = 1,
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 7, 4, 0, 0, 0, DateTimeKind.Utc)
                },
                new Banner
                {
                    Id = 2,
                    Title = "Luna Cat-Eye Black",
                    Subtitle = "Thiết kế mắt mèo sắc nét dành cho phong cách thanh lịch và nổi bật.",
                    ImageUrl = "/images/eyewear/luna-cat-eye.jpg",
                    ButtonText = "Xem sản phẩm",
                    TargetType = "product",
                    TargetValue = "5",
                    DisplayOrder = 2,
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 7, 4, 0, 0, 0, DateTimeKind.Utc)
                },
                new Banner
                {
                    Id = 3,
                    Title = "Gọng kính thời trang 2026",
                    Subtitle = "Gọng kính nhẹ, hiện đại và phù hợp nhiều kiểu khuôn mặt.",
                    ImageUrl = "/images/eyewear/urban-clear.jpg",
                    ButtonText = "Chọn gọng kính",
                    TargetType = "products",
                    DisplayOrder = 3,
                    IsActive = true,
                    CreatedDate = new DateTime(2026, 7, 4, 0, 0, 0, DateTimeKind.Utc)
                });
        }

    }
}
