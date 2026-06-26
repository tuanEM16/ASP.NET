using Microsoft.AspNetCore.Mvc;
using CMS.Data; // Nhớ sửa lại namespace cho đúng với dự án của bạn
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using CMS.Backend.Services;
namespace CMS.Backend.Controllers
{
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. GET: Hiển thị màn hình đăng nhập
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user != null && PasswordHasher.VerifyPassword(password, user.PasswordHash))
            {
                if (!PasswordHasher.IsHashed(user.PasswordHash))
                {
                    user.PasswordHash = PasswordHasher.HashPassword(password);
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }

                // 1. Tạo "Hồ sơ" chứa thông tin người dùng (Claims)
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim("FullName", user.FullName),
            new Claim(ClaimTypes.Role, user.Role) // Rất quan trọng để phân quyền Admin/Editor
        };

                // 2. Đóng gói hồ sơ thành "Thẻ chứng minh" (Identity)
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                // 3. Phát hành Cookie cho trình duyệt (Đăng nhập thành công)
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity));

                return RedirectToAction("Index", "Home");
            }

            ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không chính xác!";
            return View();
        }

        // Hàm Đăng xuất
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Auth");
        }
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
