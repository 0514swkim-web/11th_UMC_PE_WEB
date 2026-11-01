import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      {/* 영화 포스터 */}
      <img 
        src={movie.posterPath} 
        alt={movie.title}
        style={{ width: "100%", height: "auto" }}
      />
      
      {/* 영화 제목 */}
      <h3>{movie.title}</h3>
      
      {/* 개봉일 */}
      <p>{movie.releaseDate}</p>
      
      {/* 북마크 버튼 */}
      <button onClick={() => onToggleBookmark(movie.id)}>
        {movie.isBookmarked ? "북마크됨 ❤️" : "북마크"}
      </button>
    </div>
  );
}