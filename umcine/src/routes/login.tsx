import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../pages/auth/login-page";
import { useAuthStore } from "../stores/auth-store";

export const Route = createFileRoute("/login")({
  // 페이지를 그리기 전에 실행: 이미 토큰이 있으면 로그인 화면 대신 홈으로 보냄
  // (토큰이 진짜 유효한지는 헤더의 내 정보 조회가 401로 확인함)
  beforeLoad: () => {
    if (useAuthStore.getState().accessToken) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
