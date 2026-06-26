using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return View(orders);
        }

        [HttpGet]
        public IActionResult Create()
        {
            LoadCustomerList();
            return View(new Order { OrderDate = DateTime.Now });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Order model)
        {
            if (!ModelState.IsValid)
            {
                LoadCustomerList(model.CustomerId);
                return View(model);
            }

            _context.Orders.Add(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã tạo đơn hàng.";
            return RedirectToAction("Details", new { id = model.Id });
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            LoadCustomerList(order.CustomerId);
            return View(order);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Order model)
        {
            if (!ModelState.IsValid)
            {
                LoadCustomerList(model.CustomerId);
                return View(model);
            }

            _context.Orders.Update(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã cập nhật đơn hàng.";
            return RedirectToAction("Index");
        }

        public IActionResult Details(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails!)
                    .ThenInclude(d => d.Product)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        public IActionResult Delete(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            if (order.OrderDetails != null && order.OrderDetails.Any())
            {
                _context.OrderDetails.RemoveRange(order.OrderDetails);
            }

            _context.Orders.Remove(order);
            _context.SaveChanges();
            TempData["Success"] = "Đã xóa đơn hàng.";
            return RedirectToAction("Index");
        }

        private void LoadCustomerList(int? selectedId = null)
        {
            ViewBag.CustomerList = new SelectList(
                _context.Customers.OrderBy(c => c.FullName).ToList(),
                "Id",
                "FullName",
                selectedId);
        }
    }
}
