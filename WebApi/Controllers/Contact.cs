using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using Microsoft.AspNetCore.Http;


namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class Contact : ControllerBase
  {
    [HttpPost]

    public IActionResult SubmitContactMessage([FromBody] ContactMessage contactMessage)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      // Hier würden Sie normalerweise die Nachricht in einer Datenbank speichern oder per E-Mail versenden.
      // Für dieses Beispiel geben wir einfach eine Erfolgsmeldung zurück.
      return Ok(new { message = "Kontaktanfrage erfolgreich übermittelt.", data = contactMessage });
    }

  }
}
