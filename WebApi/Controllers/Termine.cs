using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class Termine : ControllerBase
  {

    [HttpGet(nameof(GetTermine))]

    public IActionResult GetTermine()
    {
      // Hier würden normalerweise die Termine aus einer Datenbank oder einem anderen Speicher abgerufen werden.
      var termine = new[]
      {
        new { Id = 1, Titel = "Meeting mit Team", Datum = "2024-07-01T10:00:00" },
        new { Id = 2, Titel = "Projektpräsentation", Datum = "2024-07-05T14:00:00" },
        new { Id = 3, Titel = "Kundengespräch", Datum = "2024-07-10T09:00:00" }
      };
      return Ok(termine);
    }




  }
}
