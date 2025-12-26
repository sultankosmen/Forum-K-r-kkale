using CleanArchitecture.Domain.Common;

namespace CleanArchitecture.Domain.Entities
{
    public class Entry : BaseEntity
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        public string UserId { get; set; }

        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string IpAddress { get; set; } = string.Empty;

        public int FavoriteCount { get; set; }

        public Topic Topic { get; set; }
        public User User { get; set; }
        public ICollection<EntryFavorite> Favorites { get; set; } = new List<EntryFavorite>();

    }
}
