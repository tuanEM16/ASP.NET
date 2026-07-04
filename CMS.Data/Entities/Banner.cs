using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class Banner
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tiêu đề banner không được để trống")]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Subtitle { get; set; }

        [Required(ErrorMessage = "Banner phải có hình ảnh")]
        [StringLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [StringLength(50)]
        public string ButtonText { get; set; } = "Xem chi tiết";

        [Required]
        [StringLength(20)]
        public string TargetType { get; set; } = "products";

        [StringLength(500)]
        public string? TargetValue { get; set; }

        public int DisplayOrder { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
