using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int page = 1)
        {
            const int pageSize = 8;
            page = Math.Max(page, 1);

            var query = _context.Products.OrderByDescending(p => p.Id);
            var totalItems = query.Count();
            var products = _context.Products
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CategoryProductNames = _context.CategoriesProducts
                .ToDictionary(x => x.Id, x => x.Name);
            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            return View(products);
        }

        [HttpGet]
        public IActionResult Create()
        {
            LoadCategoryList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Product model, IFormFile uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                model.ImageUrl = SaveUploadedImage(uploadImage);
            }

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryProductId);
                return View(model);
            }

            _context.Products.Add(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã thêm sản phẩm mới.";
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            LoadCategoryList(product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Product model, IFormFile uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                model.ImageUrl = SaveUploadedImage(uploadImage);
            }
            else
            {
                var oldProduct = _context.Products.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
                if (oldProduct != null)
                {
                    model.ImageUrl = oldProduct.ImageUrl;
                }
            }

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryProductId);
                return View(model);
            }

            _context.Products.Update(model);
            _context.SaveChanges();
            TempData["Success"] = "Đã cập nhật sản phẩm.";
            return RedirectToAction("Index");
        }

        public IActionResult Details(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            ViewBag.CategoryProductName = _context.CategoriesProducts
                .Where(x => x.Id == product.CategoryProductId)
                .Select(x => x.Name)
                .FirstOrDefault();

            return View(product);
        }

        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            var hasOrderDetails = _context.OrderDetails.Any(x => x.ProductId == id);
            if (hasOrderDetails)
            {
                TempData["Error"] = "Không thể xóa sản phẩm đã phát sinh đơn hàng.";
                return RedirectToAction("Index");
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
            TempData["Success"] = "Đã xóa sản phẩm.";
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult UploadDescriptionImage(IFormFile upload)
        {
            if (upload == null || upload.Length == 0)
            {
                return BadRequest(new { error = new { message = "Vui lòng chọn hình ảnh để tải lên." } });
            }

            var imageUrl = SaveUploadedImage(upload);
            return Json(new { url = imageUrl });
        }

        private void LoadCategoryList(int? selectedId = null)
        {
            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.OrderBy(x => x.Name).ToList(),
                "Id",
                "Name",
                selectedId);
        }

        private string SaveUploadedImage(IFormFile uploadImage)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(uploadImage.FileName);
            var filePath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                uploadImage.CopyTo(stream);
            }

            return "/uploads/" + fileName;
        }
    }
}
