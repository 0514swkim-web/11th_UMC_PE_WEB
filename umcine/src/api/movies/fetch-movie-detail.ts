import ky from "ky";
import type { TmdbMovieDetail } from "./models";

// 브라우저용: 내 정보(즐겨찾기 목록), 회원 API 화면처럼 Client Component에서 영화 정보가 필요할 때
// TMDB에 바로 요청하지 않고 우리 Next.js 서버의 Route Handler(/api/movies/[movieId])를 거침
// → TMDB 토큰은 서버에만 있음
export function fetchMovieDetail(movieId: number) {
  return ky.get(`/api/movies/${movieId}`, { retry: 0 }).json<TmdbMovieDetail>();
}
