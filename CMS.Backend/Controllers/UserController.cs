using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using CMS.Backend.Services;
namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var users = _context.Users.ToList();

            return View(users);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(User model)
        {
            // Kiểm tra xem tên đăng nhập đã tồn tại chưa
            var checkExist = _context.Users.Any(u => u.Username == model.Username);
            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            model.PasswordHash = PasswordHasher.HashPassword(model.PasswordHash);
            _context.Users.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
        // ==========================================
        // CHỨC NĂNG SỬA (EDIT)
        // ==========================================

        // GET: Lấy thông tin thành viên cũ hiện lên Form
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound(); // Trả về lỗi 404 nếu không tìm thấy User
            }
            return View(user);
        }

        // POST: Nhận dữ liệu mới và lưu đè vào Database
        [HttpPost]
        public IActionResult Edit(User model)
        {
            // Kiểm tra xem Username đổi mới có bị trùng với người khác không (ngoại trừ chính họ)
            var checkExist = _context.Users.Any(u => u.Username == model.Username && u.Id != model.Id);
            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người khác sử dụng!");
                return View(model);
            }

            var oldUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);
            if (oldUser != null && model.PasswordHash == oldUser.PasswordHash)
            {
                model.PasswordHash = oldUser.PasswordHash;
            }
            else if (!PasswordHasher.IsHashed(model.PasswordHash))
            {
                model.PasswordHash = PasswordHasher.HashPassword(model.PasswordHash);
            }

            _context.Users.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ==========================================
        // CHỨC NĂNG XÓA (DELETE)
        // ==========================================

        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}
