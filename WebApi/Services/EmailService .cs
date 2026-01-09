using MailKit.Net.Smtp;
using MimeKit;

namespace WebApi.Services
{
  public interface IEmailService
  {
    Task SendWelcomeEmail(string toEmail, string firstName);
  }

  public class EmailService : IEmailService
  {
    public async Task SendWelcomeEmail(string toEmail, string firstName)
    {
      var message = new MimeMessage();
      message.From.Add(new MailboxAddress("Team ADHS", "noreply@team-adhs.at"));
      message.To.Add(new MailboxAddress(firstName, toEmail));
      message.Subject = "Willkommen bei Team ADHS!";

      message.Body = new TextPart("plain")
      {
        Text = $@"Liebe/r {firstName},

vielen Dank für deine Mitgliedschaft bei Team ADHS!

ZAHLUNGSINFORMATIONEN:
Kontoinhaber: Team ADHS
IBAN: AT12 3456 7890 1234 5678
BIC: BAWAATWW
Betrag: €30 (Jahresbeitrag)
Verwendungszweck: Mitgliedsbeitrag {DateTime.Now.Year}

Sobald deine Zahlung eingegangen ist, erhältst du eine Bestätigung.

Herzliche Grüße,
Dein Team ADHS"
      };

      using var client = new SmtpClient();
      await client.ConnectAsync("localhost", 25, false);  // Fake SMTP
      await client.SendAsync(message);
      await client.DisconnectAsync(true);
    }
  }
}
