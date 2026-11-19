import { umcClient } from "../umc-client";

// 백엔드 LoginRequest, ApiResponse<LoginResponse>(record)와 같은 모양
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    nickname: string;
    accessToken: string;
  };
}

// 로그인은 아직 토큰이 없을 때 하는 요청이라 authApi가 아니라 umcClient로 보냄
export function login(body: LoginRequest) {
  return umcClient.post("auth/login", { json: body }).json<LoginResponse>();
}
