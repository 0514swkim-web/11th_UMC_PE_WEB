import Link from "next/link";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/bookmark-button";
import { MoviePoster } from "../../components/movies/movie-poster";
import { formatReleaseDate } from "../../utils/movies/format-release-date";
import { SearchForm } from "./search-form";

interface SearchPageProps {
  query: string;
}

// 9주차: useSearch + useQuery → 주소의 ?query=를 서버에서 받아 바로 TMDB 검색
export async function SearchPage({ query }: SearchPageProps) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return (
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-40">
        <h1 className="mb-8 text-3xl font-bold">어떤 영화를 찾고 있나요?</h1>
        <div className="w-full max-w-[600px]">
          <SearchForm key="" initialQuery="" />
        </div>
        <p className="mt-4 text-sm text-gray-400">검색어를 입력해 주세요.</p>
      </div>
    );
  }

  const data = await searchMovies({ query: normalizedQuery }).catch(() => null);
  const movies = data?.results ?? [];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="mb-4 text-2xl font-bold">영화 검색</h1>
      {/* key가 바뀌면 검색창을 새로 만들어 입력칸이 새 검색어로 채워짐 (useEffect 동기화 대신) */}
      <SearchForm key={normalizedQuery} initialQuery={normalizedQuery} />

      <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="font-semibold">‘{normalizedQuery}’ 검색 결과</h2>
        {data && <p className="text-xs text-gray-400">영화 {movies.length}편</p>}
      </div>

      {!data ? (
        <p className="py-20 text-center text-sm text-red-600">
          검색 결과를 불러오지 못했어요.
        </p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="flex gap-5 border-b border-gray-200 py-6"
            >
              <div className="relative shrink-0">
                <Link href={`/movies/${movie.id}`}>
                  <MoviePoster
                    posterPath={movie.poster_path}
                    title={movie.title}
                    sizes="96px"
                    className="w-24 rounded-md shadow"
                  />
                </Link>
                <BookmarkButton movieId={movie.id} />
              </div>
              <div className="flex min-w-0 flex-col">
                <h3 className="font-bold">{movie.title}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  {movie.original_title} ·{" "}
                  {formatReleaseDate(movie.release_date)}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {movie.overview || "줄거리 정보가 없어요."}
                </p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="mt-auto pt-3 text-sm font-semibold text-blue-600 hover:underline"
                >
                  상세 보기 →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchLoading() {
  return (
    <p className="py-40 text-center text-sm text-gray-500">
      검색 결과를 불러오는 중이에요.
    </p>
  );
}
