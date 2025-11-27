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

    [HttpGet(nameof(GetAll))]

    public async Task<IActionResult> GetAll()
    {
      // Hier würden normalerweise die Termine aus einer Datenbank oder einem anderen Speicher abgerufen werden.
      var termine = await _context.Termine
            .OrderBy(t => t.Date)
            .ToListAsync();

      return Ok(termine);
    }


    [HttpPost]

   public IActionResult AddTermin(Termin termin)
    {
      _context.Termine.Add(termin);
      _context.SaveChanges();
      return Ok();


    }



  }
}
