import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { MoviePoster } from "../../components/movies/movie-poster";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { formatRuntime } from "../../utils/movies/format-runtime";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

function DetailMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-32 text-center">
      <p className="text-gray-500">{children}</p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
      >
        영화 목록으로
      </Link>
    </div>
  );
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(parsedMovieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let ignore = false;

    setMovie(null);
    setErrorMessage(null);

    if (!isValidMovieId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    async function loadMovie() {
      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, isValidMovieId]);

  if (!isValidMovieId) {
    return <DetailMessage>올바르지 않은 영화 번호예요.</DetailMessage>;
  }
  if (isLoading) {
    return <DetailMessage>영화 정보를 불러오는 중이에요.</DetailMessage>;
  }
  if (errorMessage || !movie) {
    return <DetailMessage>{errorMessage ?? "영화 정보를 불러오지 못했어요."}</DetailMessage>;
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <section className="relative h-[360px] overflow-hidden bg-gray-900">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-sm text-gray-500">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-between px-6 py-6 text-white">
          <Link
            to="/"
            className="flex w-fit items-center gap-1 text-sm text-white/90 hover:text-white"
          >
            <img
              src="/icons/movie-icons/chevron-left.svg"
              alt=""
              className="h-4 w-4 brightness-0 invert"
            />
            영화 목록
          </Link>

          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2 text-sm text-white/80">{movie.original_title}</p>
            <p className="mt-2 text-sm font-semibold">
              {formatReleaseDate(movie.release_date)} · {genreNames || "장르 정보 없음"} ·{" "}
              {formatRuntime(movie.runtime)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-10 lg:flex-row">
        <div className="flex flex-1 gap-8">
          <MoviePoster
            posterPath={movie.poster_path}
            title={movie.title}
            className="w-44 shrink-0 rounded-lg shadow-xl"
          />
          <div>
            {movie.tagline && <h2 className="text-lg font-bold">{movie.tagline}</h2>}
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {movie.overview || "줄거리 정보가 없어요."}
            </p>

            <button
              type="button"
              onClick={() => toggleBookmark(movie.id)}
              aria-pressed={isBookmarked}
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold",
                isBookmarked
                  ? "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                  : "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              <img
                src={
                  isBookmarked
                    ? "/icons/movie-icons/bookmark.svg"
                    : "/icons/movie-icons/bookmark-outline.svg"
                }
                alt=""
                className={cn("h-4 w-4", !isBookmarked && "brightness-0 invert")}
              />
              {isBookmarked ? "즐겨찾기됨" : "즐겨찾기"}
            </button>
          </div>
        </div>

        <aside className="w-full border-gray-200 lg:w-72 lg:border-l lg:pl-10">
          <h2 className="font-bold">내 평점</h2>
          <p className="mt-1 text-xs text-gray-400">별점을 선택하고 한 줄 평을 남겨 보세요.</p>

          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setRating(score)}
                aria-label={`${score}점`}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded border",
                  score <= rating ? "border-yellow-400 bg-yellow-50" : "border-gray-200 bg-white",
                )}
              >
                <img
                  src={
                    score <= rating
                      ? "/icons/movie-icons/star.svg"
                      : "/icons/movie-icons/star-outline.svg"
                  }
                  alt=""
                  className="h-4 w-4"
                />
              </button>
            ))}
          </div>

          <textarea
            placeholder="영화를 보고 느낀 점을 남겨 보세요."
            className="mt-4 h-24 w-full resize-none rounded-md border border-gray-200 bg-white p-3 text-sm outline-none focus:border-gray-400"
          />
          <button
            type="button"
            className="mt-3 w-full rounded-md bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
          >
            평점 저장
          </button>
        </aside>
      </section>
    </div>
  );
}
