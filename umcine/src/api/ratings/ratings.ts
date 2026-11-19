import { authApi } from "../auth-api";
import type { MemberRating } from "../members/models";

// 백엔드 CreateRatingRequest·UpdateRatingRequest, ApiResponse<RatingResponse>(record)와 같은 모양
export interface CreateRatingRequest {
  movieId: number;
  score: number; // 1~5
  comment: string | null; // 선택, 500자 이하
}

export interface UpdateRatingRequest {
  score: number;
  comment: string | null;
}

interface RatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberRating;
}

interface DeleteRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null; // 삭제는 돌려줄 데이터가 없음
}

// 평점 쓰기는 "누가 썼는지"를 서버가 토큰으로 판단 → 모두 authApi로 요청
export function createRating(body: CreateRatingRequest) {
  return authApi.post("ratings", { json: body }).json<RatingResponse>();
}

export function updateRating(ratingId: number, body: UpdateRatingRequest) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<RatingResponse>();
}

export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<DeleteRatingResponse>();
}
