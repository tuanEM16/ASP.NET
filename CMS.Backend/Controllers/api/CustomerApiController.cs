using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Services;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly EmailSettings _emailSettings;

        public CustomerApiController(
            ApplicationDbContext context,
            IEmailSender emailSender,
            IOptions<EmailSettings> emailSettings)
        {
            _context = context;
            _emailSender = emailSender;
            _emailSettings = emailSettings.Value;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.Customers
                .AsNoTracking()
                .Select(customer => new
                {
                    customer.Id,
                    customer.FullName,
                    customer.Email,
                    customer.Phone,
                    customer.Address
                })
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Customers
                .AsNoTracking()
                .Where(customer => customer.Id == id)
                .Select(customer => new
                {
                    customer.Id,
                    customer.FullName,
                    customer.Email,
                    customer.Phone,
                    customer.Address
                })
                .FirstOrDefaultAsync();

            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CustomerRegisterRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.FullName)
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ họ tên, email và mật khẩu." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var emailExists = await _context.Customers.AnyAsync(c => c.Email.ToLower() == normalizedEmail);
            if (emailExists)
            {
                return BadRequest(new { message = "Email này đã được đăng ký." });
            }

            var customer = new Customer
            {
                FullName = request.FullName.Trim(),
                Email = normalizedEmail,
                Phone = request.Phone?.Trim(),
                Address = request.Address?.Trim(),
                Password = PasswordHasher.HashPassword(request.Password)
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Đăng ký khách hàng thành công.",
                customerId = customer.Id,
                customer.FullName,
                customer.Email
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CustomerLoginRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập Email và mật khẩu." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var customer = await _context.Customers
                .FirstOrDefaultAsync(item => item.Email.ToLower() == normalizedEmail);

            if (customer == null || !PasswordHasher.VerifyPassword(request.Password, customer.Password))
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không chính xác." });
            }

            if (!PasswordHasher.IsHashed(customer.Password))
            {
                customer.Password = PasswordHasher.HashPassword(request.Password);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = "Đăng nhập thành công.",
                customer = new
                {
                    customer.Id,
                    customer.FullName,
                    customer.Email,
                    customer.Phone,
                    customer.Address
                }
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new { message = "Vui lòng nhập Email." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var customer = await _context.Customers
                .FirstOrDefaultAsync(item => item.Email.ToLower() == normalizedEmail);

            if (customer != null)
            {
                var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
                customer.ResetPasswordTokenHash = HashResetToken(token);
                customer.ResetPasswordTokenExpiresAt = DateTime.UtcNow.AddMinutes(30);
                await _context.SaveChangesAsync();

                var resetUrl = $"{_emailSettings.FrontendBaseUrl.TrimEnd('/')}"
                    + $"?page=reset-password&email={Uri.EscapeDataString(customer.Email)}"
                    + $"&token={Uri.EscapeDataString(token)}";

                await _emailSender.SendPasswordResetAsync(customer, resetUrl);
            }

            return Ok(new
            {
                message = "Nếu Email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi."
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (request == null
                || string.IsNullOrWhiteSpace(request.Email)
                || string.IsNullOrWhiteSpace(request.Token)
                || string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ Email, token và mật khẩu mới." });
            }

            if (request.NewPassword.Length < 6)
            {
                return BadRequest(new { message = "Mật khẩu mới phải có ít nhất 6 ký tự." });
            }

            var normalizedEmail = request.Email.Trim().ToLower();
            var tokenHash = HashResetToken(request.Token.Trim());
            var customer = await _context.Customers.FirstOrDefaultAsync(item =>
                item.Email.ToLower() == normalizedEmail
                && item.ResetPasswordTokenHash == tokenHash
                && item.ResetPasswordTokenExpiresAt > DateTime.UtcNow);

            if (customer == null)
            {
                return BadRequest(new { message = "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn." });
            }

            customer.Password = PasswordHasher.HashPassword(request.NewPassword);
            customer.ResetPasswordTokenHash = null;
            customer.ResetPasswordTokenExpiresAt = null;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đặt lại mật khẩu thành công." });
        }

        private static string HashResetToken(string token)
        {
            return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
        }
    }

    public class CustomerRegisterRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class CustomerLoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
