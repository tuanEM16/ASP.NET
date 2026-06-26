using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CategoryProductController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Index", "ProductCategory");
        }
    }
}
