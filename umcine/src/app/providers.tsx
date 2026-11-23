"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "../stores/auth-store";

const ONE_MINUTE = 60 * 1000;

// Vite의 main.tsx에서 하던 일 (QueryClientProvider, Devtools)
// Context(Provider)는 브라우저 상태를 다루므로 Client Component에서만 쓸 수 있음
export function Providers({ children }: { children: ReactNode }) {
  // 파일 맨 위에 new QueryClient()를 두면 서버에서는 모든 사용자의 요청이 캐시 하나를 같이 씀
  // → useState로 "이 브라우저(이 요청)만의" QueryClient를 한 번 만듦
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: ONE_MINUTE } },
      }),
  );

  // 화면이 브라우저에 붙은 뒤(하이드레이션 후)에 localStorage에서 토큰을 읽음
  // useEffect 안은 브라우저에서만 실행됨 → 서버에서 localStorage를 건드리지 않음
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
