using CMS.Data.Entities;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace CMS.Backend.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _settings;
        private readonly IWebHostEnvironment _environment;

        public EmailSender(IOptions<EmailSettings> settings, IWebHostEnvironment environment)
        {
            _settings = settings.Value;
            _environment = environment;
        }

        public async Task SendOrderConfirmationAsync(Order order, Customer customer, IEnumerable<OrderDetail> details)
        {
            if (string.IsNullOrWhiteSpace(customer.Email) || customer.Email.EndsWith("@checkout.local", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var subject = $"EyeStyle.Store - Xac nhan don hang #{order.Id}";
            var body = BuildOrderEmail(order, customer, details);

            if (string.IsNullOrWhiteSpace(_settings.Host))
            {
                await SaveDevelopmentEmailAsync(order.Id, customer.Email, subject, body);
                return;
            }

            using var message = new MailMessage
            {
                From = new MailAddress(_settings.FromEmail, _settings.FromName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(customer.Email);

            using var client = new SmtpClient(_settings.Host, _settings.Port)
            {
                EnableSsl = _settings.EnableSsl
            };

            if (!string.IsNullOrWhiteSpace(_settings.UserName))
            {
                client.Credentials = new NetworkCredential(_settings.UserName, _settings.Password);
            }

            await client.SendMailAsync(message);
        }

        private async Task SaveDevelopmentEmailAsync(int orderId, string toEmail, string subject, string body)
        {
            var folder = Path.Combine(_environment.WebRootPath, "order-emails");
            Directory.CreateDirectory(folder);

            var fileName = $"order-{orderId}-{DateTime.Now:yyyyMMddHHmmss}.html";
            var content = new StringBuilder()
                .AppendLine($"<!-- To: {toEmail} -->")
                .AppendLine($"<!-- Subject: {subject} -->")
                .AppendLine(body)
                .ToString();

            await File.WriteAllTextAsync(Path.Combine(folder, fileName), content, Encoding.UTF8);
        }

        private static string BuildOrderEmail(Order order, Customer customer, IEnumerable<OrderDetail> details)
        {
            var rows = details.Select(detail => $@"
                <tr>
                    <td>{WebUtility.HtmlEncode(detail.Product?.Name ?? $"San pham #{detail.ProductId}")}</td>
                    <td style=""text-align:center"">{detail.Quantity}</td>
                    <td style=""text-align:right"">{detail.UnitPrice:N0} d</td>
                    <td style=""text-align:right"">{(detail.UnitPrice * detail.Quantity):N0} d</td>
                </tr>");

            return $@"
                <h2>Cam on {WebUtility.HtmlEncode(customer.FullName)} da dat hang tai EyeStyle.Store</h2>
                <p>Ma don hang: <strong>#{order.Id}</strong></p>
                <p>Ngay dat: {order.OrderDate:dd/MM/yyyy HH:mm}</p>
                <p>Dia chi giao hang: {WebUtility.HtmlEncode(customer.Address ?? string.Empty)}</p>
                <table cellpadding=""8"" cellspacing=""0"" border=""1"" style=""border-collapse:collapse;width:100%"">
                    <thead>
                        <tr>
                            <th>San pham</th>
                            <th>So luong</th>
                            <th>Don gia</th>
                            <th>Thanh tien</th>
                        </tr>
                    </thead>
                    <tbody>{string.Join("", rows)}</tbody>
                </table>
                <h3>Tong tien: {order.TotalAmount:N0} d</h3>";
        }
    }
}
