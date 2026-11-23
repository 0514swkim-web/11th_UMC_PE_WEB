import "server-only";
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

interface SearchMoviesRequest {
  query: string;
  page?: number;
}

type SearchMoviesResponse = TmdbMovieListResponse;

// 검색어는 요청마다 달라서 캐시하지 않음 → 요청을 받을 때 서버에서 조회
function searchMovies({ query, page = 1 }: SearchMoviesRequest) {
  return tmdbClient
    .get("search/movie", {
      searchParams: {
        query,
        language: "ko-KR",
        include_adult: false,
        page,
      },
    })
    .json<SearchMoviesResponse>();
}

export {
  searchMovies,
  type SearchMoviesRequest,
  type SearchMoviesResponse,
};
