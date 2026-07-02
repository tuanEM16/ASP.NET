using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.Products
                .OrderByDescending(p => p.Id)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest([FromQuery] int take = 3)
        {
            take = Math.Clamp(take, 1, 12);

            var items = await _context.Products
                .OrderByDescending(p => p.Id)
                .Take(take)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("hot")]
        public async Task<IActionResult> GetHotProducts([FromQuery] int take = 3)
        {
            take = Math.Clamp(take, 1, 12);

            var items = await _context.Products
                .AsNoTracking()
                .Select(product => new
                {
                    product.Id,
                    product.Name,
                    product.Description,
                    product.Price,
                    product.StockQuantity,
                    product.ImageUrl,
                    product.CategoryProductId,
                    SoldQuantity = _context.OrderDetails
                        .Where(detail => detail.ProductId == product.Id)
                        .Sum(detail => (int?)detail.Quantity) ?? 0
                })
                .OrderByDescending(product => product.SoldQuantity)
                .ThenByDescending(product => product.Id)
                .Take(take)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return Ok(Array.Empty<Product>());
            }

            var normalizedKeyword = keyword.Trim();
            var items = await _context.Products
                .AsNoTracking()
                .Where(product =>
                    product.Name.Contains(normalizedKeyword)
                    || (product.Description != null && product.Description.Contains(normalizedKeyword)))
                .OrderByDescending(product => product.Id)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter(
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? categoryId,
            [FromQuery] string? keyword)
        {
            if (minPrice < 0 || maxPrice < 0)
            {
                return BadRequest(new { message = "Đơn giá không được nhỏ hơn 0." });
            }

            if (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice)
            {
                return BadRequest(new { message = "Đơn giá Min không được lớn hơn đơn giá Max." });
            }

            var query = _context.Products.AsNoTracking().AsQueryable();

            if (minPrice.HasValue)
            {
                query = query.Where(product => product.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(product => product.Price <= maxPrice.Value);
            }

            if (categoryId.HasValue)
            {
                query = query.Where(product => product.CategoryProductId == categoryId.Value);
            }

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                var normalizedKeyword = keyword.Trim();
                query = query.Where(product =>
                    product.Name.Contains(normalizedKeyword)
                    || (product.Description != null && product.Description.Contains(normalizedKeyword)));
            }

            var items = await query
                .OrderByDescending(product => product.Id)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("price-range")]
        public async Task<IActionResult> GetPriceRange()
        {
            var priceRange = await _context.Products
                .GroupBy(_ => 1)
                .Select(group => new
                {
                    MinPrice = group.Min(product => product.Price),
                    MaxPrice = group.Max(product => product.Price)
                })
                .FirstOrDefaultAsync();

            return Ok(priceRange ?? new
            {
                MinPrice = 0m,
                MaxPrice = 0m
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Products.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
    }
}
