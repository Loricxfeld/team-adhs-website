using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.DTOs
{
  public class MemberCreateDto
  {
    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string? Phone { get; set; }

    // Adresse als nested object
    [Required]
    public AddressDto Address { get; set; } = new();

    [Required]
    public string MembershipType { get; set; } = string.Empty;

    public List<string>? Interests { get; set; }  // ✅ Array

    public bool ActiveSupport { get; set; }

    public List<string>? SupportAreas { get; set; }  // ✅ Array

    public bool Newsletter { get; set; }

    [Required]
    public bool DataProtection { get; set; }

    public string? AdditionalInfo { get; set; }
  }

  public class AddressDto
  {
    [Required]
    public string Street { get; set; } = string.Empty;

    [Required]
    public string PostalCode { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = "Österreich";
  }
}
