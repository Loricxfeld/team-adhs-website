using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Entities;

namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TestController(ApplicationDbContext context) : ControllerBase
  {
    private readonly ApplicationDbContext _context = context;

    // GET: api/test/members
    [HttpGet("members")]
    public async Task<IActionResult> GetMembers()
    {
      var members = await _context.Members.ToListAsync();
      return Ok(members);
    }

    // POST: api/test/member
    [HttpPost("member")]
    public async Task<IActionResult> AddMember([FromBody] Member member)
    {
      member.CreatedAt = DateTime.UtcNow;
      member.UpdatedAt = DateTime.UtcNow;
      member.JoinDate = DateTime.UtcNow;

      _context.Members.Add(member);
      await _context.SaveChangesAsync();

      return Ok(new { Success = true, Id = member.Id });
    }
  }
}
