import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { FavoriteToggleButton } from "../../components/movies/favorite-toggle-button";
import { MoviePoster } from "../../components/movies/movie-poster";
import { MyRatingPanel } from "../../components/movies/my-rating-panel";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { formatRuntime } from "../../utils/movies/format-runtime";
import { getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";

function DetailMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-32 text-center">
      <p className="text-gray-500">{children}</p>
      <Link
        href="/"
        className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
      >
        영화 목록으로
      </Link>
    </div>
  );
}

// 주소의 movieId가 1 이상의 정수인지 (generateMetadata와 같이 씀)
export function parseMovieId(movieId: string) {
  const parsedMovieId = Number(movieId);
  return Number.isInteger(parsedMovieId) && parsedMovieId > 0
    ? parsedMovieId
    : null;
}

interface MovieDetailPageProps {
  movieId: string;
}

// 9주차: useParams + useQuery → Server Component에서 params를 받아 바로 TMDB 조회
// - 제목·줄거리·포스터: 서버에서 HTML로 완성 (검색 엔진도 읽을 수 있음)
// - 즐겨찾기 버튼, 내 평점 칸: 로그인 토큰(localStorage)과 클릭이 필요 → Client Component
export async function MovieDetailPage({ movieId }: MovieDetailPageProps) {
  const parsedMovieId = parseMovieId(movieId);

  if (!parsedMovieId) {
    return <DetailMessage>올바르지 않은 영화 번호예요.</DetailMessage>;
  }

  // 없는 영화면 null, 네트워크 오류 등은 "error"
  const movie = await getMovieDetail(parsedMovieId).catch(() => "error" as const);

  if (movie === "error") {
    return <DetailMessage>영화 정보를 불러오지 못했어요.</DetailMessage>;
  }
  if (!movie) {
    return <DetailMessage>영화를 찾을 수 없어요.</DetailMessage>;
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div>
      <section className="relative h-[360px] overflow-hidden bg-gray-900">
        {backdropUrl ? (
          // fill: 부모(section) 크기에 맞춰 채움. 첫 화면에 바로 보이니 eager
          <Image
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-sm text-gray-500">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-between px-6 py-6 text-white">
          <Link
            href="/"
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
              {formatReleaseDate(movie.release_date)} ·{" "}
              {genreNames || "장르 정보 없음"} · {formatRuntime(movie.runtime)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-10 lg:flex-row">
        <div className="flex flex-1 gap-8">
          <MoviePoster
            posterPath={movie.poster_path}
            title={movie.title}
            sizes="176px"
            eager
            className="w-44 shrink-0 rounded-lg shadow-xl"
          />
          <div>
            {movie.tagline && (
              <h2 className="text-lg font-bold">{movie.tagline}</h2>
            )}
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {movie.overview || "줄거리 정보가 없어요."}
            </p>

            {/* Client Component: 서버에서 받은 movie.id(숫자)만 props로 넘김 */}
            <FavoriteToggleButton movieId={movie.id} />
          </div>
        </div>

        <MyRatingPanel movieId={movie.id} />
      </section>
    </div>
  );
}

export function MovieDetailLoading() {
  return (
    <p className="py-32 text-center text-sm text-gray-500">
      영화 정보를 불러오는 중이에요.
    </p>
  );
}
