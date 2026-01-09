using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.DTOs;
using WebApi.Models.Entities;
using WebApi.Services;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class MembersController : ControllerBase
  {
    private readonly ApplicationDbContext _context;
    private readonly IEmailService _emailService;

    public MembersController(ApplicationDbContext context, IEmailService emailService)
    {
      _context = context;
      _emailService = emailService;
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
      await _emailService.SendWelcomeEmail(member.Email, member.FirstName);


      return Ok(new
      {
        Success = true,
        Id = member.Id,
        Message = "Mitgliedschaft erfolgreich beantragt"
      });
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var members = await _context.Members
        .OrderByDescending(m => m.CreatedAt)
        .ToListAsync();

      return Ok(members);
    }

    // PATCH: api/members/{id}/status
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
      var member = await _context.Members.FindAsync(id);

      if (member == null)
        return NotFound();

      member.Status = status;
      member.UpdatedAt = DateTime.Now;

      await _context.SaveChangesAsync();

      return Ok(new { Success = true, Message = "Status aktualisiert" });
    }
  }
}
