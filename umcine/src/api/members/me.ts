import { authApi } from "../auth-api";

// 백엔드 MemberInfoResponse(record)와 같은 모양
export interface MemberInfo {
  memberId: number; // 8주차 BE에서 추가: 내 평점 조회(GET /members/{memberId}/ratings)에 사용
  email: string;
  nickname: string;
  createdAt: string;
}

interface MeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberInfo;
}

// 내 정보는 토큰이 있어야 볼 수 있어서 authApi로 요청 (헤더에 토큰이 자동으로 붙음)
// 화면에서 쓰는 건 회원 정보뿐이라 겉봉투(isSuccess, code...)는 벗기고 result만 돌려줌
export async function getMe(): Promise<MemberInfo> {
  const response = await authApi.get("members/me").json<MeResponse>();
  return response.result;
}
