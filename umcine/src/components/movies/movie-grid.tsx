import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(5, 1fr)",  // 한 줄에 5개씩
      gap: "20px",
      padding: "20px"
    }}>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}