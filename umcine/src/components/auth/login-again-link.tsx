"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";

// "로그인이 필요해요" 화면의 로그인하기 버튼
// 그냥 <Link href="/login">이면 쓸 수 없는 옛 토큰이 남아 있을 때
// /login의 GuestOnly가 "토큰 있음 = 로그인됨"으로 보고 홈으로 돌려보냄
// → 옛 토큰을 먼저 지우고, 지금 주소를 redirect로 넘겨서 로그인 후 돌아오게 함
export function LoginAgainLink() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleClick = () => {
    setAccessToken(null);
    const from = window.location.pathname + window.location.search;
    router.push(`/login?redirect=${encodeURIComponent(from)}`);
  };

  return (
    <button type="button" onClick={handleClick} className="font-semibold text-blue-600">
      로그인하기
    </button>
  );
}
