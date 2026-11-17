using System.Collections.Generic;
namespace backend.Models
{
    public class Faction
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;

        //allows a faction to have many units
        public List<Unit> Units {get; set; } = new();
    }
}