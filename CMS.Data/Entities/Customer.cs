using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    // Khách hàng
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        [Required]
        public string Password { get; set; } = string.Empty; // Luôn lưu dưới dạng PBKDF2 có salt

        public string? ResetPasswordTokenHash { get; set; }

        public DateTime? ResetPasswordTokenExpiresAt { get; set; }

        public virtual ICollection<Order>? Orders { get; set; }
    }
}

