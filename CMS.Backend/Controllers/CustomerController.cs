using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CMS.Backend.Services;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var customers = _context.Customers
                .Include(c => c.Orders)
                .OrderByDescending(c => c.Id)
                .ToList();

            return View(customers);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Customer model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            model.Password = PasswordHasher.HashPassword(model.Password);
            _context.Customers.Add(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã thêm khách hàng.";
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var customer = _context.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Customer model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var oldCustomer = _context.Customers.AsNoTracking().FirstOrDefault(c => c.Id == model.Id);
            if (oldCustomer != null && model.Password == oldCustomer.Password)
            {
                model.Password = oldCustomer.Password;
            }
            else if (!PasswordHasher.IsHashed(model.Password))
            {
                model.Password = PasswordHasher.HashPassword(model.Password);
            }

            _context.Customers.Update(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã cập nhật khách hàng.";
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var customer = _context.Customers
                .Include(c => c.Orders)
                .FirstOrDefault(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            if (customer.Orders != null && customer.Orders.Any())
            {
                TempData["Error"] = "Không thể xóa khách hàng đã có đơn hàng.";
                return RedirectToAction("Index");
            }

            _context.Customers.Remove(customer);
            _context.SaveChanges();
            TempData["Success"] = "Đã xóa khách hàng.";
            return RedirectToAction("Index");
        }
    }
}
