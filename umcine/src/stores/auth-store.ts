import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

// 로그인 토큰은 서버가 아니라 브라우저가 들고 있어야 하는 값(클라이언트 상태)
// persist로 localStorage에 저장해서 새로고침해도 로그인이 풀리지 않게 함
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "umcine-auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      // 9주차: Client Component도 처음 HTML은 서버에서 만듦. 서버에는 localStorage가 없음
      // 자동으로 바로 읽으면 "서버 HTML(토큰 없음)"과 "브라우저 첫 화면(토큰 있음)"이 달라져
      // 하이드레이션 오류가 남 → 자동 읽기를 끄고, 브라우저에서 화면이 붙은 뒤 직접 읽음
      skipHydration: true,
    },
  ),
);

// localStorage에서 토큰을 다 읽어 왔는지 (서버와 브라우저 첫 화면에서는 false)
// false인 동안에는 "로그인 안 됨"으로 판단하지 않고 로딩으로 보여 줌
export function useAuthHydrated() {
  return useSyncExternalStore(
    (onChange) => useAuthStore.persist.onFinishHydration(onChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}
