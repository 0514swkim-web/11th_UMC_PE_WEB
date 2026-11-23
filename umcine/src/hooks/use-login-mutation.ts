import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";
import { getRedirectPath } from "../utils/get-redirect-path";

export function useLoginMutation() {
  // main.tsx의 QueryClientProvider에 넣어 둔 바로 그 queryClient(캐시 창고)를 꺼냄
  const queryClient = useQueryClient();
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      // ① 토큰 저장 → 이제부터 authApi 요청에 토큰이 붙음
      setAccessToken(response.result.accessToken);
      alert("로그인에 성공했어요.");
      // ② 내 정보 캐시를 "오래됨"으로 표시 → 사용 중인 화면(헤더)이 바로 다시 요청
      //    (staleTime 5분이 남아 있어도 기다리지 않음)
      queryClient.invalidateQueries({ queryKey: ["members", "me"] });
      // ③ 가려던 페이지(?redirect=)로, 없으면 홈으로 이동
      //    replace: 뒤로 가기를 눌러도 로그인 화면으로 다시 오지 않게
      router.replace(getRedirectPath());
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
