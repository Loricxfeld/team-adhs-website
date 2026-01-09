using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models.DTOs;
using WebApi.Models.Entities;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MembersController : ControllerBase
  {
    private readonly ApplicationDbContext _context;

    public MembersController(ApplicationDbContext context)
    {
      _context = context;
    }

    // POST: api/members
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MemberCreateDto dto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var member = new Member
      {
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email,
        Phone = dto.Phone,
        Street = dto.Address.Street,
        PostalCode = dto.Address.PostalCode,
        City = dto.Address.City,
        Country = dto.Address.Country,
        MembershipType = dto.MembershipType,
        Interests = dto.Interests != null ? string.Join(",", dto.Interests) : null,  // ✅ Array → String
        ActiveSupport = dto.ActiveSupport,
        SupportAreas = dto.SupportAreas != null ? string.Join(",", dto.SupportAreas) : null,  // ✅ Array → String
        Newsletter = dto.Newsletter,
        DataProtection = dto.DataProtection,
        AdditionalInfo = dto.AdditionalInfo,
        Status = "pending",
        JoinDate = DateTime.Now,
        CreatedAt = DateTime.Now,
        UpdatedAt = DateTime.Now
      };

      _context.Members.Add(member);
      await _context.SaveChangesAsync();

      return Ok(new
      {
        Success = true,
        Id = member.Id,
        Message = "Mitgliedschaft erfolgreich beantragt"
      });
    }
  }
}
