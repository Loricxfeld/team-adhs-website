using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
  public class Event
  {
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty; // Flexibel - kann in DB erweitert werden

    [Required]
    public DateTime Date { get; set; }

    [MaxLength(10)]
    public string? Time { get; set; }

    public bool IsOnline { get; set; }

    [MaxLength(500)]
    public string? Location { get; set; }

    [MaxLength(500)]
    public string? ZoomLink { get; set; }

    [Required]
    [Column(TypeName = "text")]
    public string Description { get; set; } = string.Empty;

    public bool RequiresRegistration { get; set; }

    [MaxLength(200)]
    public string? Moderator { get; set; }

    [MaxLength(200)]
    public string? Frequency { get; set; }

    public bool IsRecurring { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
  }
}
