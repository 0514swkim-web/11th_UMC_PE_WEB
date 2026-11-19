import { useAuthStore } from "../stores/auth-store";
import { umcClient } from "./umc-client";

// umcClient(서버 주소, retry 0)를 그대로 물려받고, 토큰 처리만 더한 인스턴스
// 로그인이 필요한 API(내 정보, 평점 쓰기, 즐겨찾기)는 umcClient 대신 authApi로 요청
export const authApi = umcClient.extend({
  hooks: {
    // 요청을 보내기 직전: 저장된 토큰이 있으면 Authorization 헤더에 붙임
    beforeRequest: [
      ({ request }) => {
        // 컴포넌트 밖이라 훅(useAuthStore(...)) 대신 getState()로 현재 값을 읽음
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    // 응답을 받은 직후: 401(토큰 없음·만료·위조)이면 저장된 토큰을 지움
    afterResponse: [
      ({ response }) => {
        if (response.status === 401) {
          useAuthStore.getState().setAccessToken(null);
        }
      },
    ],
  },
});
