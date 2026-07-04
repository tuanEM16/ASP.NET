using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BannerApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetActive()
        {
            var banners = await _context.Banners
                .AsNoTracking()
                .Where(banner => banner.IsActive)
                .OrderBy(banner => banner.DisplayOrder)
                .ThenByDescending(banner => banner.Id)
                .Select(banner => new
                {
                    banner.Id,
                    banner.Title,
                    banner.Subtitle,
                    banner.ImageUrl,
                    banner.ButtonText,
                    banner.TargetType,
                    banner.TargetValue
                })
                .ToListAsync();

            return Ok(banners);
        }
    }
}
