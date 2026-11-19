import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

// (auth) 폴더 = Route Group: 괄호 이름은 주소에 안 들어감 → /me, /me/edit 그대로
// 이 route.tsx = 그룹의 공통 Layout Route: 안에 있는 페이지는 모두 여기를 먼저 거침
export const Route = createFileRoute("/(auth)")({
  // 하위 페이지를 그리기 전에 실행: 토큰이 없으면 로그인 화면으로 보냄
  // (페이지마다 검사를 넣지 않고 입구 한 곳에서 막음)
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  // <Outlet /> 자리에 /me 또는 /me/edit 페이지가 들어감
  component: () => <Outlet />,
});
