using Microsoft.EntityFrameworkCore;
using WebApi.Controllers;
using WebApi.Models.Entities;

namespace WebApi.Data
{
  /// <summary>
  /// Haupt-Datenbank-Context
  /// Hier werden alle Tabellen (DbSets) definiert
  /// </summary>
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // DbSets = Tabellen in der Datenbank
    public DbSet<ContactMessage> ContactMessages { get; set; }
    public DbSet<Member> Members { get; set; }
    public DbSet<Termin> Termine { get; set; }

    // Weitere DbSets hier hinzufügen wenn neue Models erstellt werden
  }
}
