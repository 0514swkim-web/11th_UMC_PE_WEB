import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberRatings } from "../api/members/get-member-ratings";
import {
  createRating,
  deleteRating,
  updateRating,
  type CreateRatingRequest,
  type UpdateRatingRequest,
} from "../api/ratings/ratings";
import { useMeQuery } from "./use-me-query";

// 내 평점 목록 = GET /members/{내 memberId}/ratings
// memberId는 내 정보 응답에서 꺼냄 → 로그인 전이면 memberId가 없어서 요청 안 함
export function myRatingsQueryKey(memberId: number | undefined) {
  return ["members", memberId, "ratings"];
}

export function useMyRatingsQuery() {
  const memberId = useMeQuery().data?.memberId;

  return useQuery({
    queryKey: myRatingsQueryKey(memberId),
    queryFn: () => getMemberRatings(memberId!),
    enabled: memberId !== undefined,
  });
}

// 등록·수정·삭제를 한곳에 모음
// 성공하면 내 평점 목록 캐시를 invalidateQueries로 "오래됨" 표시 → 상세 화면이 다시 조회
// (setQueryData로 목록 안의 한 칸만 바꿀 수도 있지만, 목록은 다시 받아 오는 쪽이 단순하고 확실함)
export function useMyRatingMutations() {
  const queryClient = useQueryClient();
  const memberId = useMeQuery().data?.memberId;

  const refreshMyRatings = () =>
    queryClient.invalidateQueries({ queryKey: myRatingsQueryKey(memberId) });

  const createMutation = useMutation({
    mutationFn: (body: CreateRatingRequest) => createRating(body),
    onSuccess: () => {
      alert("평점을 등록했어요.");
      return refreshMyRatings();
    },
    onError: () => alert("평점 등록에 실패했어요. 다시 시도해 주세요."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ ratingId, body }: { ratingId: number; body: UpdateRatingRequest }) =>
      updateRating(ratingId, body),
    onSuccess: () => {
      alert("평점을 수정했어요.");
      return refreshMyRatings();
    },
    onError: () => alert("평점 수정에 실패했어요. 다시 시도해 주세요."),
  });

  const deleteMutation = useMutation({
    mutationFn: (ratingId: number) => deleteRating(ratingId),
    onSuccess: () => {
      alert("평점을 삭제했어요.");
      return refreshMyRatings();
    },
    onError: () => alert("평점 삭제에 실패했어요. 다시 시도해 주세요."),
  });

  return { createMutation, updateMutation, deleteMutation };
}
