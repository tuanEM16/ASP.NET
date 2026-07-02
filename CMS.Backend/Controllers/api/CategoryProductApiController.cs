using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.CategoriesProducts
                .AsNoTracking()
                .Select(category => new
                {
                    category.Id,
                    category.Name,
                    category.Description,
                    ImageUrl = category.Products!
                        .OrderByDescending(product => product.Id)
                        .Select(product => product.ImageUrl)
                        .FirstOrDefault(),
                    ProductCount = category.Products!.Count()
                })
                .OrderBy(category => category.Name)
                .ToListAsync();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.CategoriesProducts.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
    }
}
