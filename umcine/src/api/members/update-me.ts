import { authApi } from "../auth-api";
import type { MemberInfo } from "./me";

// 백엔드 MemberUpdateRequest, ApiResponse<MemberInfoResponse>(record)와 같은 모양
export interface UpdateMeRequest {
  nickname: string;
}

interface UpdateMeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberInfo; // 내 정보 조회와 같은 모양 → 이 값으로 캐시를 바로 바꿀 수 있음
}

export function updateMe(body: UpdateMeRequest) {
  return authApi.patch("members/me", { json: body }).json<UpdateMeResponse>();
}
