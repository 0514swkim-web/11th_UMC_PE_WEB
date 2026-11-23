import type { Metadata } from "next";
import { GuestOnly } from "../../components/auth/auth-guards";
import { LoginPage } from "../../screens/auth/login-page";

// page.tsx는 Server Component로 두고 metadata만 export
// 폼(useState, onSubmit)은 Client Component인 LoginPage가 맡음
// → page.tsx에 "use client"를 붙이면 metadata를 export할 수 없음 (워크북 3.2)
export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginRoutePage() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
