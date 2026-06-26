using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
namespace CMS.Backend.Controllers

{
    [Authorize]
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? id, int page = 1)
        {
            const int pageSize = 6;
            page = Math.Max(page, 1);

            if (id == null)
            {
                // Khi truy cập /Post (không có id), lấy tất cả bài viết
                var query = _context.Posts
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedDate);

                var totalItems = query.Count();
                var allPosts = query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                ViewBag.CurrentPage = page;
                ViewBag.TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
                ViewBag.CategoryId = null;
                return View(allPosts);
            }

            // Khi truy cập /Post/Index/5 (có id), lọc theo danh mục
            var filteredQuery = _context.Posts
                .Where(p => p.CategoryId == id)
                .OrderByDescending(p => p.CreatedDate)
                .Include(p => p.Category);

            var filteredTotalItems = filteredQuery.Count();
            var posts = filteredQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = (int)Math.Ceiling(filteredTotalItems / (double)pageSize);
            ViewBag.CategoryId = id;
            return View(posts);
        }

        public IActionResult Details(int id)
        {
            // 1. Truy vấn bài viết theo ID
            // Sử dụng .Include(p => p.Category) để lấy kèm thông tin Danh mục (Join bảng)
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            // 2. Kiểm tra nếu không tìm thấy bài viết (tránh lỗi màn hình trắng)
            if (post == null)
            {
                return NotFound(); // Trả về trang lỗi 404
            }

            // 3. Truyền dữ liệu sang View
            return View(post);
        }
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Post model, IFormFile uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                model.ImageUrl = SaveUploadedImage(uploadImage);
            }

            _context.Posts.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
        // GET: Hiển thị form kèm dữ liệu cũ của bài viết
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null) return NotFound();

            // Chuẩn bị lại danh sách danh mục để người dùng có thể đổi chuyên mục
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", post.CategoryId);
            return View(post);
        }

        // POST: Thực hiện cập nhật dữ liệu đã sửa
        [HttpPost]
        public IActionResult Edit(Post model, IFormFile uploadImage)
        {
            // Bước 1: Kiểm tra xem người dùng có chọn file ảnh mới không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                model.ImageUrl = SaveUploadedImage(uploadImage);
            }
            else
            {
                // Bước quan trọng: Nếu không upload ảnh mới, giữ lại ảnh cũ bằng cách lấy lại giá trị từ Database
                var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
                if (oldPost != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldPost.ImageUrl;
                }
            }

            _context.Posts.Update(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult UploadContentImage(IFormFile upload)
        {
            if (upload == null || upload.Length == 0)
            {
                return BadRequest(new { error = new { message = "Vui lòng chọn hình ảnh để tải lên." } });
            }

            var imageUrl = SaveUploadedImage(upload);
            return Json(new { url = imageUrl });
        }

        private string SaveUploadedImage(IFormFile uploadImage)
        {
            string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
            string filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                uploadImage.CopyTo(stream);
            }

            return "/uploads/" + fileName;
        }
    }
}
