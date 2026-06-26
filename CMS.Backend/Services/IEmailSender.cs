using CMS.Data.Entities;

namespace CMS.Backend.Services
{
    public interface IEmailSender
    {
        Task SendOrderConfirmationAsync(Order order, Customer customer, IEnumerable<OrderDetail> details);
    }
}
