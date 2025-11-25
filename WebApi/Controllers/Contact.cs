using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WebApi.Models.Entities;


namespace WebApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class Contact : ControllerBase
  {
    [HttpPost (nameof(SubmitContactMessage))]

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


    [HttpGet (nameof(Persons))]

    public ActionResult<string> Persons()
    {
      return Ok();
    }


    [HttpPost(nameof(membership))]


    public IActionResult membership(Member member)
    {
      return Ok();
    }
  }
}
