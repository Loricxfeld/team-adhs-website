using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Entities
{
  public class ContactMessage
  {

    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Subject { get; set; }

    [Required]
    [Column(TypeName = "text")]
    public string Message { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty; // general, membership, events, support, media, cooperation

    public bool IsUrgent { get; set; } = false;

    [MaxLength(20)]
    public string? PreferredContact { get; set; } // email, phone

    [MaxLength(50)]
    public string? Phone { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "unread"; // unread, read, replied

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  }
}
