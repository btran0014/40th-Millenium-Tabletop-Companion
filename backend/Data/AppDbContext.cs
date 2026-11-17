using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        public DbSet<Faction> Factions => Set<Faction>();
        public DbSet<Unit> Units => Set<Unit>();
    }
}