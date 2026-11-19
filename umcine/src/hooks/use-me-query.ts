import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

// 내 정보 query를 한 곳에서 정의해서 헤더, 내 정보, 수정 화면이 같은 key·옵션을 씀
// (key가 같으면 캐시도 하나 → 어느 화면에서 바꿔도 모두 같은 값을 봄)
export const ME_QUERY_KEY = ["members", "me"];

export function useMeQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    enabled: Boolean(accessToken), // 토큰이 있을 때만 요청
    staleTime: 5 * 60 * 1000, // 내 정보는 자주 안 바뀌니 5분 동안 최신으로 취급
    retry: false, // 401로 토큰을 지운 뒤 같은 요청을 또 보내지 않게
  });
}
