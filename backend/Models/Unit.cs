namespace backend.Models
{
    public class Unit
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public int PointCost {get; set;}
        public int MovementStat {get; set;}
        public int ToughnesStat {get; set;}
        public int SaveStat { get; set;}
        public int WoundStat {get; set;}
        public int LeadershipStat {get; set;}
        public int ObjectiveControlStat {get; set;}
        public int InvulnerableSaveStat {get; set;}

        //FKR to Faction
        public int FactionId {get; set;}
        public Faction? Faction {get; set;}
    }
}