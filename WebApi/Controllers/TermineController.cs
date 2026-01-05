using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models.Entities;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TermineController(ApplicationDbContext context) : ControllerBase
  {
    private readonly ApplicationDbContext _context = context;

    // GET: api/termine
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var termine = await _context.Termine
        .OrderBy(t => t.Date)
        .ToListAsync();

      return Ok(termine);
    }

    // GET: api/termine/upcoming
    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcoming([FromQuery] int limit = 10)
    {
      var termine = await _context.Termine
        .Where(t => t.Date >= DateTime.Now)
        .OrderBy(t => t.Date)
        .Take(limit)
        .ToListAsync();

      return Ok(termine);
    }

    // GET: api/termine/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var termin = await _context.Termine.FindAsync(id);

      if (termin == null)
        return NotFound();

      return Ok(termin);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Termin termin)
    {
      if (id != termin.Id)
        return BadRequest();

      var existing = await _context.Termine.FindAsync(id);
      if (existing == null)
        return NotFound();

      existing.Title = termin.Title;
      existing.Type = termin.Type;
      existing.Date = termin.Date;
     
      existing.IsOnline = termin.IsOnline;
      existing.Location = termin.Location;
      existing.ZoomLink = termin.ZoomLink;
      existing.Description = termin.Description;
      existing.Moderator = termin.Moderator;
    
      existing.RequiresRegistration = termin.RequiresRegistration;
      existing.UpdatedAt = DateTime.Now;

      await _context.SaveChangesAsync();

      return Ok(new { Success = true, Message = "Termin aktualisiert" });
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var termin = await _context.Termine.FindAsync(id);

      if (termin == null)
        return NotFound();

      _context.Termine.Remove(termin);
      await _context.SaveChangesAsync();

      return Ok(new { Success = true, Message = "Termin gelöscht" });
    }
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Termin termin)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      termin.CreatedAt = DateTime.Now;
      termin.UpdatedAt = DateTime.Now;

      _context.Termine.Add(termin);
      await _context.SaveChangesAsync();

      return Ok(new
      {
        Success = true,
        Id = termin.Id,
        Message = "Termin erfolgreich erstellt"
      });
    }

  }
}
