import { create } from "zustand";

interface MyInfoStore {
  nickname: string;
  email: string;
  updateNickname: (nickname: string) => void;
}

// 8주차에 내 정보 API를 연결하기 전까지 쓰는 임시 값. 새로고침하면 처음 값으로 돌아감
export const useMyInfoStore = create<MyInfoStore>()((set) => ({
  nickname: "moviefan",
  email: "umc@example.com",
  updateNickname: (nickname) => set({ nickname }),
}));
