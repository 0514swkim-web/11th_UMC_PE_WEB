import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/members/update-me";
import type { MemberInfo } from "../api/members/me";
import { ME_QUERY_KEY } from "./use-me-query";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (response) => {
      // 서버가 수정된 내 정보를 응답에 담아 줬으니 다시 조회(GET)하지 않고 캐시에 바로 넣음
      // → 같은 key를 쓰는 헤더와 내 정보 화면이 함께 바뀜
      queryClient.setQueryData<MemberInfo>(ME_QUERY_KEY, response.result);
      alert("내 정보 수정에 성공했어요.");
    },
    onError: () => {
      alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
