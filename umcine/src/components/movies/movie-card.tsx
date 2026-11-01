
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      >
        <img src={movie.posterPath} alt={movie.title} style={{ width: "100%", height: "auto" }} />
        <h3>{movie.title}</h3>
      <p>{movie.releaseDate}</p>
      <button onClick={() => onToggleBookmark(movie.id)}>
        {movie.isBookmarked ? "북마크됨 ❤️" : "북마크"}
      </button>
    </div>
  );
}