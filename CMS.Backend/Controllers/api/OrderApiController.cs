using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IOrderEmailQueue _emailQueue;

        public OrderApiController(ApplicationDbContext context, IOrderEmailQueue emailQueue)
        {
            _context = context;
            _emailQueue = emailQueue;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                .ThenInclude(od => od.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CheckoutRequest request)
        {
            if (request == null || request.Items == null || !request.Items.Any())
            {
                return BadRequest(new { message = "Giỏ hàng đang trống." });
            }

            if (string.IsNullOrWhiteSpace(request.FullName)
                || string.IsNullOrWhiteSpace(request.Phone)
                || string.IsNullOrWhiteSpace(request.Address))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ." });
            }

            await using var transaction = await _context.Database.BeginTransactionAsync();

            var email = string.IsNullOrWhiteSpace(request.Email)
                ? $"guest-{Guid.NewGuid():N}@checkout.local"
                : request.Email.Trim();

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
            if (customer == null)
            {
                customer = new Customer
                {
                    FullName = request.FullName.Trim(),
                    Email = email,
                    Phone = request.Phone.Trim(),
                    Address = request.Address.Trim(),
                    Password = PasswordHasher.HashPassword(Guid.NewGuid().ToString("N"))
                };
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
            }
            else
            {
                customer.FullName = request.FullName.Trim();
                customer.Phone = request.Phone.Trim();
                customer.Address = request.Address.Trim();
            }

            var productIds = request.Items.Select(i => i.ProductId).Distinct().ToList();
            var products = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            var orderDetails = new List<OrderDetail>();
            decimal totalAmount = 0;

            foreach (var item in request.Items)
            {
                if (item.Quantity <= 0)
                {
                    return BadRequest(new { message = "Số lượng sản phẩm không hợp lệ." });
                }

                if (!products.TryGetValue(item.ProductId, out var product))
                {
                    return NotFound(new { message = $"Không tìm thấy sản phẩm mã {item.ProductId}." });
                }

                if (product.StockQuantity < item.Quantity)
                {
                    return BadRequest(new { message = $"Số lượng sản phẩm trong kho không đủ: {product.Name}" });
                }

                product.StockQuantity -= item.Quantity;
                totalAmount += product.Price * item.Quantity;

                orderDetails.Add(new OrderDetail
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                });
            }

            var order = new Order
            {
                CustomerId = customer.Id,
                OrderDate = DateTime.Now,
                Status = 0,
                Notes = request.Notes,
                TotalAmount = totalAmount,
                OrderDetails = orderDetails
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            foreach (var detail in orderDetails)
            {
                detail.Product = products[detail.ProductId];
            }

            var emailQueued = _emailQueue.TryQueue(new OrderEmailWorkItem(
                order,
                customer,
                orderDetails.ToList()));

            if (!emailQueued)
            {
                return Ok(new
                {
                    message = "Đặt hàng thành công, nhưng email xác nhận đang tạm hoãn.",
                    orderId = order.Id,
                    totalAmount = order.TotalAmount
                });
            }

            return Ok(new
            {
                message = "Đặt hàng thành công.",
                orderId = order.Id,
                totalAmount = order.TotalAmount
            });
        }
    }

    public class CheckoutRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public List<CheckoutItemRequest> Items { get; set; } = new List<CheckoutItemRequest>();
    }

    public class CheckoutItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
