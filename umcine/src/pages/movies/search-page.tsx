import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const hasQuery = normalizedQuery !== "";
  const searchResults = hasQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  const searchForm = (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-white px-4 py-2",
        hasQuery ? "border-gray-200" : "border-gray-900 shadow-lg",
      )}
    >
      <img src="/icons/movie-icons/search.svg" alt="" className="h-4 w-4 opacity-60" />
      <input
        aria-label="검색어"
        placeholder="예: 스파이더맨"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
      {searchText && (
        <button
          type="button"
          onClick={() => setSearchText("")}
          aria-label="검색어 지우기"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100"
        >
          <img src="/icons/movie-icons/close.svg" alt="" className="h-3.5 w-3.5 opacity-60" />
        </button>
      )}
      <button
        type="submit"
        className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700"
      >
        {hasQuery ? "다시 검색" : "검색"}
      </button>
    </form>
  );

  if (!hasQuery) {
    return (
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-40">
        <h1 className="mb-8 text-3xl font-bold">어떤 영화를 찾고 있나요?</h1>
        <div className="w-full max-w-[600px]">{searchForm}</div>
        <p className="mt-4 text-sm text-gray-400">검색어를 입력해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="mb-4 text-2xl font-bold">영화 검색</h1>
      {searchForm}

      <div className="mt-8 flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="font-semibold">‘{query}’ 검색 결과</h2>
        <p className="text-xs text-gray-400">영화 {searchResults.length}편</p>
      </div>

      {searchResults.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">검색 결과가 없어요.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {searchResults.map((movie) => (
            <li key={movie.id} className="flex gap-5 border-b border-gray-200 py-6">
              <div className="relative shrink-0">
                <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
                  <img
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                    className="aspect-[2/3] w-24 rounded-md object-cover shadow"
                  />
                </Link>
                <BookmarkButton movieId={movie.id} />
              </div>
              <div className="flex min-w-0 flex-col">
                <h3 className="font-bold">{movie.title}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  {movie.originalTitle} · {movie.releaseDate}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{movie.overview}</p>
                <Link
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
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