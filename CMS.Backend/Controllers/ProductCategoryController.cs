using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductCategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var items = _context.CategoriesProducts
                .Include(x => x.Products)
                .OrderBy(x => x.Name)
                .ToList();

            return View(items);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(CategoryProduct model)
        {
            model.CategoryId = 0;
            model.ProductId = 0;

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            _context.CategoriesProducts.Add(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã thêm danh mục sản phẩm.";
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var item = _context.CategoriesProducts.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(CategoryProduct model)
        {
            model.CategoryId = 0;
            model.ProductId = 0;

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            _context.CategoriesProducts.Update(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã cập nhật danh mục sản phẩm.";
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var item = _context.CategoriesProducts
                .Include(x => x.Products)
                .FirstOrDefault(x => x.Id == id);

            if (item == null)
            {
                return NotFound();
            }

            if (item.Products != null && item.Products.Any())
            {
                TempData["Error"] = "Không thể xóa danh mục đang có sản phẩm.";
                return RedirectToAction("Index");
            }

            _context.CategoriesProducts.Remove(item);
            _context.SaveChanges();
            TempData["Success"] = "Đã xóa danh mục sản phẩm.";
            return RedirectToAction("Index");
        }
    }
}
