import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useMyFavoritesQuery } from "../../hooks/use-favorites";
import { useMeQuery } from "../../hooks/use-me-query";

const BOOKMARKS_PER_PAGE = 10;

export function MyInfoPage() {
  const [page, setPage] = useState(1);
  // 7주차 임시 store 대신 헤더와 같은 query 캐시에서 읽음 → 두 화면 값이 항상 같음
  const meQuery = useMeQuery();
  const me = meQuery.data;
  // 8주차: 브라우저 저장 대신 서버의 내 즐겨찾기 목록(GET /favorites, 최근 등록순)
  // 서버는 영화 ID만 주니까, 포스터·제목은 아래에서 TMDB 상세로 채움
  const favoritesQuery = useMyFavoritesQuery();
  const bookmarkedMovieIds =
    favoritesQuery.data?.map((favorite) => favorite.movieId) ?? [];

  const totalPages = Math.max(
    Math.ceil(bookmarkedMovieIds.length / BOOKMARKS_PER_PAGE),
    1,
  );
  // 즐겨찾기를 해제해 마지막 페이지가 사라지면 그 앞 페이지를 보여 줌
  const currentPage = Math.min(page, totalPages);
  const pageMovieIds = bookmarkedMovieIds.slice(
    (currentPage - 1) * BOOKMARKS_PER_PAGE,
    currentPage * BOOKMARKS_PER_PAGE,
  );

  // 상세 화면과 같은 query key를 써서 이미 받아 온 영화는 캐시를 재사용
  const movieQueries = useQueries({
    queries: pageMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
    })),
  });

  const isPending = movieQueries.some((query) => query.isPending);
  const isError = movieQueries.some((query) => query.isError);
  const movies = movieQueries.flatMap((query) =>
    query.data
      ? [{ ...query.data, genre_ids: query.data.genres.map(({ id }) => id) }]
      : [],
  );

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 정보</h1>
        <Link
          to="/me/edit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          정보 수정
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold">기본 정보</h2>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-200">
            <img src="/icons/movie-icons/person.svg" alt="" className="h-9 w-9" />
          </div>
          {meQuery.isLoading ? (
            <p className="text-sm text-gray-500">내 정보를 불러오는 중이에요.</p>
          ) : !me ? (
            // 토큰이 없거나(요청 안 함) 401로 토큰이 지워진 경우
            <p className="text-sm text-gray-500">
              로그인이 필요해요.{" "}
              <Link to="/login" className="font-semibold text-blue-600">
                로그인하기
              </Link>
            </p>
          ) : (
            <dl className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-gray-400">닉네임</dt>
                <dd className="mt-1 text-sm font-semibold">{me.nickname}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">이메일</dt>
                <dd className="mt-1 text-sm font-semibold">{me.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">가입일</dt>
                <dd className="mt-1 text-sm font-semibold">
                  {new Date(me.createdAt).toLocaleDateString("ko-KR")}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-semibold">내 즐겨찾기</h2>

        {favoritesQuery.isPending ? (
          <p className="py-20 text-center text-sm text-gray-500">
            즐겨찾기를 불러오는 중이에요.
          </p>
        ) : favoritesQuery.isError ? (
          <p className="py-20 text-center text-sm text-red-600">
            즐겨찾기를 불러오지 못했어요.
          </p>
        ) : bookmarkedMovieIds.length === 0 ? (
          <p className="py-20 text-center text-sm text-gray-500">
            아직 즐겨찾기한 영화가 없어요.
          </p>
        ) : isPending ? (
          <p className="py-20 text-center text-sm text-gray-500">
            즐겨찾기를 불러오는 중이에요.
          </p>
        ) : isError ? (
          <p className="py-20 text-center text-sm text-red-600">
            즐겨찾기를 불러오지 못했어요.
          </p>
        ) : (
          <>
            <MovieGrid movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </div>
  );
}
