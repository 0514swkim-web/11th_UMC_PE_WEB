import "server-only";
import { isHTTPError } from "ky";
import { cacheLife } from "next/cache";
import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieDetail } from "./models";

type GetMovieDetailResponse = TmdbMovieDetail;

// 서버 전용: 영화 상세 페이지(Server Component), generateMetadata, Route Handler가 함께 씀
// 없는 영화(404)는 오류 대신 null → 화면에서 "영화를 찾을 수 없어요"를 보여 줌
async function getMovieDetail(
  movieId: number,
): Promise<GetMovieDetailResponse | null> {
  "use cache";
  cacheLife("hours");

  try {
    return await tmdbClient
      .get(`movie/${movieId}`, {
        searchParams: { language: "ko-KR" },
      })
      .json<GetMovieDetailResponse>();
  } catch (error) {
    if (isHTTPError(error) && error.response.status === 404) {
      return null;
    }
    throw error;
  }
}

export { getMovieDetail, type GetMovieDetailResponse };
