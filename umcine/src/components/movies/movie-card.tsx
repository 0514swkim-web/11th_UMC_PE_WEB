import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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

        <BookmarkButton movieId={movie.id} />
      </div>

      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h3 className="mt-2 truncate text-sm font-semibold text-gray-900">{movie.title}</h3>
      </Link>
      <p className="mt-0.5 text-xs text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}
