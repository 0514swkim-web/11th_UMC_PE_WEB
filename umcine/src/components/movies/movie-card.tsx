import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-sm">
      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
        className="block"
      >
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="aspect-[2/3] w-full object-cover"
        />
        <div className="p-3">
          <h3 className="truncate text-base font-bold text-gray-900">{movie.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{movie.releaseDate}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleBookmark(movie.id)}
        aria-pressed={movie.isBookmarked}
        className={cn(
          "absolute right-2 top-2 rounded-full px-3 py-1 text-xs text-white",
          movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
        )}
      >
        {movie.isBookmarked ? "북마크됨" : "북마크"}
      </button>
    </article>
  );
}