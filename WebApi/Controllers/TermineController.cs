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
        .Where(t => t.Date >= DateTime.UtcNow)
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


  }
}
