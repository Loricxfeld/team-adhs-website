using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models.Entities;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TermineController(ApplicationDbContext context) : ControllerBase
  {
    private readonly ApplicationDbContext _context = context;

    [HttpGet(nameof(GetTermine))]

    public ActionResult<TermineController> GetTermine()
    {
      // Hier würden normalerweise die Termine aus einer Datenbank oder einem anderen Speicher abgerufen werden.

      var termine = _context.Termine;

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
