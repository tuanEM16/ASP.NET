using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class CategoryProductController : Controller
    {
        public IActionResult Index()
        {
            return RedirectToAction("Index", "ProductCategory");
        }
    }
}
