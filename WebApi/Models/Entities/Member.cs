using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Entities
{
  public class Member
  {

    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [StringLength(50)]
    public string? Phone { get; set; }

    public DateTime? BirthDate { get; set; }

    // Adresse
    [StringLength(200)]
    public string? Street { get; set; }

    [StringLength(20)]
    public string? PostalCode { get; set; }

    [StringLength(100)]
    public string? City { get; set; }

    [StringLength(100)]
    public string? Country { get; set; }

    // Mitgliedschafts-Details
    [Required]
    [StringLength(50)]
    public string MembershipType { get; set; } = string.Empty; // "erwachsene", "studierende", "angehoerige"

    [StringLength(1000)]
    public string? Interests { get; set; } // Komma-separiert

    public bool ActiveSupport { get; set; }

    [StringLength(1000)]
    public string? SupportAreas { get; set; } // Komma-separiert

    public bool Newsletter { get; set; }

    [Required]
    public bool DataProtection { get; set; }

    [StringLength(2000)]
    public string? AdditionalInfo { get; set; }

    [StringLength(20)]
    public string Status { get; set; } = "pending"; // "pending", "active", "inactive", "cancelled"

    public DateTime JoinDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
  }
}
