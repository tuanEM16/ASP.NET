using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class BannerController : Controller
    {
        private static readonly HashSet<string> AllowedExtensions =
            new(StringComparer.OrdinalIgnoreCase) { ".jpg", ".jpeg", ".png", ".webp" };

        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public BannerController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> Index()
        {
            var banners = await _context.Banners
                .AsNoTracking()
                .OrderBy(banner => banner.DisplayOrder)
                .ThenByDescending(banner => banner.Id)
                .ToListAsync();

            return View(banners);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new Banner());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Banner model, IFormFile? uploadImage)
        {
            string? uploadedImageUrl = null;
            ModelState.Remove(nameof(Banner.ImageUrl));

            if (uploadImage is { Length: > 0 })
            {
                try
                {
                    model.ImageUrl = await SaveBannerImageAsync(uploadImage);
                    uploadedImageUrl = model.ImageUrl;
                }
                catch (InvalidOperationException exception)
                {
                    ModelState.AddModelError(nameof(Banner.ImageUrl), exception.Message);
                }
            }

            if (string.IsNullOrWhiteSpace(model.ImageUrl))
            {
                ModelState.AddModelError(nameof(Banner.ImageUrl), "Vui lòng chọn hình ảnh banner.");
            }

            await ValidateTargetAsync(model);

            if (!ModelState.IsValid)
            {
                DeleteUploadedBanner(uploadedImageUrl);
                model.ImageUrl = string.Empty;
                return View(model);
            }

            model.CreatedDate = DateTime.Now;
            _context.Banners.Add(model);
            await _context.SaveChangesAsync();
            TempData["Success"] = "Đã thêm banner mới.";

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            return banner == null ? NotFound() : View(banner);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Banner model, IFormFile? uploadImage)
        {
            string? uploadedImageUrl = null;
            var existing = await _context.Banners.AsNoTracking()
                .FirstOrDefaultAsync(banner => banner.Id == model.Id);

            if (existing == null)
            {
                return NotFound();
            }

            ModelState.Remove(nameof(Banner.ImageUrl));

            if (uploadImage is { Length: > 0 })
            {
                try
                {
                    model.ImageUrl = await SaveBannerImageAsync(uploadImage);
                    uploadedImageUrl = model.ImageUrl;
                }
                catch (InvalidOperationException exception)
                {
                    ModelState.AddModelError(nameof(Banner.ImageUrl), exception.Message);
                    model.ImageUrl = existing.ImageUrl;
                }
            }
            else
            {
                model.ImageUrl = existing.ImageUrl;
            }

            model.CreatedDate = existing.CreatedDate;
            await ValidateTargetAsync(model);

            if (!ModelState.IsValid)
            {
                DeleteUploadedBanner(uploadedImageUrl);
                model.ImageUrl = existing.ImageUrl;
                return View(model);
            }

            _context.Banners.Update(model);
            await _context.SaveChangesAsync();

            if (uploadedImageUrl != null && model.ImageUrl != existing.ImageUrl)
            {
                DeleteUploadedBanner(existing.ImageUrl);
            }

            TempData["Success"] = "Đã cập nhật banner.";
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Toggle(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            banner.IsActive = !banner.IsActive;
            await _context.SaveChangesAsync();
            TempData["Success"] = banner.IsActive ? "Đã bật banner." : "Đã tắt banner.";

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var banner = await _context.Banners.FindAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            _context.Banners.Remove(banner);
            await _context.SaveChangesAsync();
            DeleteUploadedBanner(banner.ImageUrl);
            TempData["Success"] = "Đã xóa banner.";

            return RedirectToAction(nameof(Index));
        }

        private async Task<string> SaveBannerImageAsync(IFormFile image)
        {
            var extension = Path.GetExtension(image.FileName);
            if (!AllowedExtensions.Contains(extension))
            {
                throw new InvalidOperationException("Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.");
            }

            if (image.Length > 5 * 1024 * 1024)
            {
                throw new InvalidOperationException("Ảnh banner không được vượt quá 5 MB.");
            }

            var folder = Path.Combine(_environment.WebRootPath, "uploads", "banners");
            Directory.CreateDirectory(folder);

            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            await using var stream = new FileStream(Path.Combine(folder, fileName), FileMode.Create);
            await image.CopyToAsync(stream);

            return $"/uploads/banners/{fileName}";
        }

        private async Task ValidateTargetAsync(Banner model)
        {
            var targetType = model.TargetType?.Trim().ToLowerInvariant() ?? string.Empty;
            model.TargetType = targetType;

            if (targetType is "products" or "news" or "contact")
            {
                model.TargetValue = null;
                return;
            }

            if (targetType == "product")
            {
                if (!int.TryParse(model.TargetValue, out var productId)
                    || !await _context.Products.AnyAsync(product => product.Id == productId))
                {
                    ModelState.AddModelError(
                        nameof(Banner.TargetValue),
                        "ID sản phẩm không tồn tại.");
                }

                return;
            }

            if (targetType == "post")
            {
                if (!int.TryParse(model.TargetValue, out var postId)
                    || !await _context.Posts.AnyAsync(post => post.Id == postId))
                {
                    ModelState.AddModelError(
                        nameof(Banner.TargetValue),
                        "ID bài viết không tồn tại.");
                }

                return;
            }

            if (targetType == "url")
            {
                if (!Uri.TryCreate(model.TargetValue, UriKind.Absolute, out var uri)
                    || (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
                {
                    ModelState.AddModelError(
                        nameof(Banner.TargetValue),
                        "Đường dẫn phải bắt đầu bằng http:// hoặc https://.");
                }

                return;
            }

            ModelState.AddModelError(nameof(Banner.TargetType), "Loại đích đến không hợp lệ.");
        }

        private void DeleteUploadedBanner(string? imageUrl)
        {
            const string uploadPrefix = "/uploads/banners/";
            if (string.IsNullOrWhiteSpace(imageUrl)
                || !imageUrl.StartsWith(uploadPrefix, StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var fileName = Path.GetFileName(imageUrl);
            var uploadFolder = Path.GetFullPath(
                Path.Combine(_environment.WebRootPath, "uploads", "banners"));
            var filePath = Path.GetFullPath(Path.Combine(uploadFolder, fileName));

            if (filePath.StartsWith(uploadFolder, StringComparison.OrdinalIgnoreCase)
                && System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
    }
}
