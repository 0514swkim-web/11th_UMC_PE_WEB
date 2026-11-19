import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavorite,
  getFavoriteStatus,
  getMyFavorites,
  removeFavorite,
  type FavoriteStatus,
} from "../api/favorites/favorites";
import { useAuthStore } from "../stores/auth-store";

// 즐겨찾기 캐시 key: 앞부분이 같아서 ["favorites"] 하나로 목록·여부를 한꺼번에 무효화할 수도 있음
export const favoriteKeys = {
  all: ["favorites"] as const,
  list: () => ["favorites", "list"] as const,
  status: (movieId: number) => ["favorites", "status", movieId] as const,
};

// 내 즐겨찾기 목록: 마이페이지 목록 + 영화 카드 북마크 버튼이 함께 씀
export function useMyFavoritesQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: favoriteKeys.list(),
    queryFn: getMyFavorites,
    enabled: Boolean(accessToken), // 로그인 전이면 요청 안 함
  });
}

// 영화 상세: 이 영화를 즐겨찾기했는지 (GET /favorites/{movieId})
export function useFavoriteStatusQuery(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: favoriteKeys.status(movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && movieId > 0,
  });
}

interface ToggleFavoriteVariables {
  movieId: number;
  isFavorite: boolean; // 누르기 전 상태: true면 해제, false면 등록
}

// 등록·해제를 버튼 하나로
// - 이 영화의 여부 캐시: 바뀐 값을 정확히 알아서 setQueryData로 바로 고침
// - 목록 캐시: 한 칸을 넣고 빼기보다 invalidateQueries로 다시 받아 옴
export function useToggleFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    // 등록·해제 응답 모양이 달라서(Favorite / null) 응답은 쓰지 않고 성공 여부만 봄
    mutationFn: async ({ movieId, isFavorite }: ToggleFavoriteVariables) => {
      if (isFavorite) {
        await removeFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    },
    onSuccess: (_response, { movieId, isFavorite }) => {
      queryClient.setQueryData<FavoriteStatus>(favoriteKeys.status(movieId), {
        isFavorite: !isFavorite,
      });
      return queryClient.invalidateQueries({ queryKey: favoriteKeys.list() });
    },
    onError: (_error, { movieId }) => {
      alert("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
      // 다른 탭에서 이미 바뀐 경우(409, 404) 등을 대비해 서버 값으로 다시 맞춤
      queryClient.invalidateQueries({ queryKey: favoriteKeys.status(movieId) });
      queryClient.invalidateQueries({ queryKey: favoriteKeys.list() });
    },
  });
}
