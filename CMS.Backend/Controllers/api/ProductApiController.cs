using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Products.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }
    }
}
