import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";

// TMDB는 페이지가 1000개가 넘어서, 화면에는 앞쪽 5페이지만 번호로 보여 줌
const MAX_VISIBLE_PAGES = 5;

interface MovieListPageProps {
  page: number;
}

// 9주차: useQuery(브라우저에서 요청) → Server Component에서 바로 await (서버에서 요청)
// 브라우저는 영화 목록이 이미 들어 있는 HTML을 받음 → "불러오는 중" 화면이 사라짐
// 영화 카드의 북마크 버튼만 Client Component (MovieCard → BookmarkButton)
export async function MovieListPage({ page }: MovieListPageProps) {
  // 실패하면 오류를 던지지 않고 null → 아래에서 실패 문구를 보여 줌
  const data = await getMovies({ page }).catch(() => null);

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 0, MAX_VISIBLE_PAGES);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">영화 목록</h1>

      {!data ? (
        <p className="py-20 text-center text-sm text-red-600">
          영화 목록을 불러오지 못했어요.
        </p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-500">
          조건에 맞는 영화가 없어요.
        </p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            currentPage={Math.min(page, totalPages)}
            totalPages={totalPages}
            basePath="/"
          />
        </>
      )}
    </div>
  );
}

// Suspense fallback으로 쓰는 로딩 화면 (app/page.tsx)
export function MovieListLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">영화 목록</h1>
      <p className="py-20 text-center text-sm text-gray-500">
        영화 목록을 불러오는 중이에요.
      </p>
    </div>
  );
}
