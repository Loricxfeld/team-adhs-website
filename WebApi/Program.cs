using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
  var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
  options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();
//app.MapOpenApi();
//app.MapScalarApiReference();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.MapScalarApiReference(); // ← Scalar UI
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

