import { useState } from 'react';

// Movie 인터페이스
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  isBookmarked: boolean;
}

// MovieCard Props 인터페이스
interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

// MovieCard 컴포넌트
function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <li>
      <span>{movie.title}</span>
      <p>{movie.releaseDate}</p>
      <button
        aria-pressed={movie.isBookmarked}
        onClick={() => onToggleBookmark(movie.id)}
      >
        {movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
      </button>
    </li>
  );
}

// 초기 영화 데이터
const initialMovies: Movie[] = [
  { id: 1, title: "오디세이", releaseDate: "2026.08.05", isBookmarked: true },
  { id: 2, title: "테미 스토리 5", releaseDate: "2026.06.17", isBookmarked: false },
  { id: 3, title: "옵세션", releaseDate: "2026.09.15", isBookmarked: false },
];

// App 컴포넌트
export default function App() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  }

  return (
    <main>
      <h1>영화 목록</h1>
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
      </ul>
    </main>
  );
}