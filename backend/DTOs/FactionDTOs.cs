namespace backend.DTOs
{
    public record FactionResponseDTO(int Id, string Name, int UnitCount);
    public record CreateFactionDTO(string Name);
}