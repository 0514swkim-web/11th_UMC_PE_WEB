"use client";

import Link from "next/link";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";

// 토큰 확인 전 → 로딩 / 토큰 없음 → 로그인 / 내 정보 첫 조회 중 → 로딩 / 토큰 있음 → 마이페이지
export function HeaderAuthButton() {
  const hasHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  // 내 정보(서버 상태)는 store에 복사하지 않고 query 캐시에서 꺼내 씀
  const meQuery = useMeQuery();

  // 서버 HTML과 브라우저 첫 화면은 아직 토큰을 모름 → 둘 다 로딩 모양으로 같게 그림
  if (!hasHydrated || (accessToken && meQuery.isLoading)) {
    return <span className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />;
  }

  if (!accessToken) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        로그인
      </Link>
    );
  }

  return (
    <Link
      href="/me"
      className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      {meQuery.data ? `${meQuery.data.nickname}님` : "마이페이지"}
    </Link>
  );
}
