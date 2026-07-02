namespace CMS.Backend.Services
{
    public class EmailSettings
    {
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; } = 587;
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FromEmail { get; set; } = "noreply@eyestyle.local";
        public string FromName { get; set; } = "EyeStyle.Store";
        public bool EnableSsl { get; set; } = true;
        public string FrontendBaseUrl { get; set; } = "http://localhost:3000";
    }
}
