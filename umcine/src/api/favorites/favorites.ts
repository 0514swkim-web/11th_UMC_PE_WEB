import { authApi } from "../auth-api";

// 백엔드 FavoriteResponse, FavoriteStatusResponse(record)와 같은 모양
export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface FavoriteStatus {
  isFavorite: boolean;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 즐겨찾기는 모두 "내" 데이터 → authApi(토큰 자동 첨부)로 요청, memberId는 보내지 않음

// GET /favorites → 내 즐겨찾기 목록(최근 등록순)
export async function getMyFavorites(): Promise<Favorite[]> {
  const response = await authApi.get("favorites").json<ApiResponse<Favorite[]>>();
  return response.result;
}

// GET /favorites/{movieId} → 이 영화를 즐겨찾기했는지
export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatus> {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<ApiResponse<FavoriteStatus>>();
  return response.result;
}

// POST /favorites
export function addFavorite(movieId: number) {
  return authApi
    .post("favorites", { json: { movieId } })
    .json<ApiResponse<Favorite>>();
}

// DELETE /favorites/{movieId}
export function removeFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
}
