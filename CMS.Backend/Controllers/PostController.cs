using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;
using CMS.Data; // Thêm dòng này để gọi được ApplicationDbContext
using System.Linq; // Thêm dòng này để dùng các lệnh truy vấn dữ liệu (ToList, FirstOrDefault)

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        // Khai báo biến môi trường đại diện cho Database
        private readonly ApplicationDbContext _context;

        // Constructor: Yêu cầu hệ thống cấp cho Controller này quyền truy cập Database
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách bài viết TỪ DATABASE
        public IActionResult Index()
        {
            // Vào bảng Posts trong SQL, lấy tất cả dữ liệu chuyển thành danh sách
            var posts = _context.Posts.ToList();

            return View(posts);
        }

        // Hàm Details: Hiển thị chi tiết một bài viết TỪ DATABASE
        public IActionResult Details(int id)
        {
            // Tìm bài viết đầu tiên trong bảng Posts có Id khớp với id truyền vào
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);

            // Nếu không tìm thấy bài nào thì báo lỗi 404
            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }
    }
}