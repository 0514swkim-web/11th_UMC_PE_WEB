"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthHydrated, useAuthStore } from "../../stores/auth-store";

function GuardLoading() {
  return (
    <p className="py-32 text-center text-sm text-gray-500">
      로그인 상태를 확인하는 중이에요.
    </p>
  );
}

// TanStack Router (auth)/route.tsx의 beforeLoad 대신
// 토큰은 localStorage에만 있어서 서버(또는 proxy.ts)는 볼 수 없음
// → 브라우저에서 토큰을 읽은 뒤 없으면 /login으로 보냄
export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || !accessToken) return <GuardLoading />;
  return children;
}

// login.tsx의 beforeLoad 대신: 이미 토큰이 있으면 로그인 화면 대신 홈으로
export function GuestOnly({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (hasHydrated && accessToken) {
      router.replace("/");
    }
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated || accessToken) return <GuardLoading />;
  return children;
}
