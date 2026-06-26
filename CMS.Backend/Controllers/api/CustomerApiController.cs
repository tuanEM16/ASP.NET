using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Services;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.Customers.ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Customers.FindAsync(id);
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
    }

    public class CustomerRegisterRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
