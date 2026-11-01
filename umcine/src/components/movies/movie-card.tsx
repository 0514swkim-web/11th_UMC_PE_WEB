import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="group">
      <div className="relative">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block overflow-hidden rounded-lg"
        >
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => onToggleBookmark(movie.id)}
          aria-pressed={movie.isBookmarked}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크"}
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md shadow",
            movie.isBookmarked ? "bg-blue-600" : "bg-white/90 hover:bg-white",
          )}
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/movie-icons/bookmark.svg"
                : "/icons/movie-icons/bookmark-outline.svg"
            }
            alt=""
            className={cn("h-4 w-4", movie.isBookmarked && "brightness-0 invert")}
          />
        </button>
      </div>

      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h3 className="mt-2 truncate text-sm font-semibold text-gray-900">{movie.title}</h3>
      </Link>
      <p className="mt-0.5 text-xs text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}