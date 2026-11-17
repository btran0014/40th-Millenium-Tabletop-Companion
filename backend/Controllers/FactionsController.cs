using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FactionsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FactionResponseDTO>>> GetFactions()
        {
            var factions = await _context.Factions
            .Include(f => f.Units)
            .Select(f => new FactionResponseDTO(f.Id, f.Name, f.Units.Count))
            .ToListAsync();

            return Ok(factions);
        }
        [HttpPost]
        public async Task<ActionResult<FactionResponseDTO>> CreateFaction(CreateFactionDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest("Faction name is required.");

            var faction = new Faction {Name = dto.Name.Trim()};
            _context.Factions.Add(faction);
            await _context.SaveChangesAsync();

            var response = new FactionResponseDTO(faction.Id, faction.Name, 0);
            return CreatedAtAction(nameof(GetFactions), new {id = faction.Id}, response);
        }
    }
}