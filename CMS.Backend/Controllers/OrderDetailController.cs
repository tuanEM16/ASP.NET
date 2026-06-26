using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var orderDetails = _context.OrderDetails
                .Include(d => d.Order)
                    .ThenInclude(o => o!.Customer)
                .Include(d => d.Product)
                .OrderByDescending(d => d.OrderId)
                .ToList();

            return View(orderDetails);
        }

        [HttpGet]
        public IActionResult Create(int? orderId)
        {
            LoadLists(orderId);
            return View(new OrderDetail { OrderId = orderId ?? 0, Quantity = 1 });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(OrderDetail model)
        {
            if (!ModelState.IsValid)
            {
                LoadLists(model.OrderId, model.ProductId);
                return View(model);
            }

            _context.OrderDetails.Add(model);
            _context.SaveChanges();
            UpdateOrderTotal(model.OrderId);
            TempData["Success"] = "Đã thêm chi tiết đơn hàng.";
            return RedirectToAction("Details", "Order", new { id = model.OrderId });
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var detail = _context.OrderDetails.Find(id);
            if (detail == null)
            {
                return NotFound();
            }

            LoadLists(detail.OrderId, detail.ProductId);
            return View(detail);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(OrderDetail model)
        {
            if (!ModelState.IsValid)
            {
                LoadLists(model.OrderId, model.ProductId);
                return View(model);
            }

            _context.OrderDetails.Update(model);
            _context.SaveChanges();
            UpdateOrderTotal(model.OrderId);
            TempData["Success"] = "Đã cập nhật chi tiết đơn hàng.";
            return RedirectToAction("Details", "Order", new { id = model.OrderId });
        }

        public IActionResult Delete(int id)
        {
            var detail = _context.OrderDetails.Find(id);
            if (detail == null)
            {
                return NotFound();
            }

            var orderId = detail.OrderId;
            _context.OrderDetails.Remove(detail);
            _context.SaveChanges();
            UpdateOrderTotal(orderId);
            TempData["Success"] = "Đã xóa chi tiết đơn hàng.";
            return RedirectToAction("Details", "Order", new { id = orderId });
        }

        private void LoadLists(int? selectedOrderId = null, int? selectedProductId = null)
        {
            ViewBag.OrderList = new SelectList(
                _context.Orders
                    .Include(o => o.Customer)
                    .OrderByDescending(o => o.OrderDate)
                    .Select(o => new
                    {
                        o.Id,
                        DisplayName = "#" + o.Id + " - " + (o.Customer != null ? o.Customer.FullName : "Khách hàng")
                    })
                    .ToList(),
                "Id",
                "DisplayName",
                selectedOrderId);

            ViewBag.ProductList = new SelectList(
                _context.Products.OrderBy(p => p.Name).ToList(),
                "Id",
                "Name",
                selectedProductId);
        }

        private void UpdateOrderTotal(int orderId)
        {
            var order = _context.Orders.Find(orderId);
            if (order == null)
            {
                return;
            }

            order.TotalAmount = _context.OrderDetails
                .Where(d => d.OrderId == orderId)
                .Sum(d => d.Quantity * d.UnitPrice);

            _context.Orders.Update(order);
            _context.SaveChanges();
        }
    }
}
