import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { BookmarkButton } from "../bookmark-button";
import { MoviePoster } from "./movie-poster";

interface MovieCardProps {
  movie: TmdbMovieListItem;
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
          <MoviePoster
            posterPath={movie.poster_path}
            title={movie.title}
            className="w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <BookmarkButton movieId={movie.id} />
      </div>

      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h3 className="mt-2 truncate text-sm font-semibold text-gray-900">{movie.title}</h3>
      </Link>
      <p className="mt-0.5 text-xs text-gray-400">{formatReleaseDate(movie.release_date)}</p>
    </article>
  );
}
