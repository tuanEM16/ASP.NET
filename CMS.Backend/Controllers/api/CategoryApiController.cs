using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data; // Đảm bảo gọi đúng namespace chứa ApplicationDbContext
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.api
{
    // 1. Khai báo Route (Đường dẫn truy cập)
    // [controller] sẽ tự động lấy tên class bỏ chữ "Controller" đi (thành "CategoryApi")
    [Route("api/[controller]")]

    // 2. Đánh dấu đây là một API Controller
    [ApiController]

    // 3. Kế thừa từ ControllerBase (chứ không phải Controller như MVC vì ta không cần View)
    public class CategoryApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // 4. Tiêm DbContext vào để tương tác với Database
        public CategoryApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // API 1: LẤY DANH SÁCH TẤT CẢ DANH MỤC
        // GET: api/CategoryApi
        // ==========================================
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            // Lấy toàn bộ dữ liệu từ bảng Categories
            var categories = await _context.Categories.ToListAsync();

            // Trả về mã trạng thái 200 (Thành công) kèm theo dữ liệu JSON
            return Ok(categories);
        }
    }
}