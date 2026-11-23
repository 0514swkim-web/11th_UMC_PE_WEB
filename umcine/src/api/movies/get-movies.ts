import "server-only";
import { cacheLife } from "next/cache";
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

interface GetMoviesRequest {
  page?: number;
}

type GetMoviesResponse = TmdbMovieListResponse;

// 인기 영화 목록은 모든 사람에게 같고 자주 안 바뀜 → 서버에서 1시간 캐시
// (같은 page로 다시 요청하면 TMDB까지 안 가고 저장해 둔 결과를 씀)
async function getMovies({ page = 1 }: GetMoviesRequest = {}) {
  "use cache";
  cacheLife("hours");

  return tmdbClient
    .get("movie/popular", {
      searchParams: { language: "ko-KR", page },
    })
    .json<GetMoviesResponse>();
}

export { getMovies, type GetMoviesRequest, type GetMoviesResponse };
