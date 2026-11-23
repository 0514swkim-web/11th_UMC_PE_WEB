import type { ReactNode } from "react";
import { RequireAuth } from "../../components/auth/auth-guards";

// (auth) 폴더 = Route Group: 괄호 이름은 주소에 안 들어감 → /me, /me/edit 그대로
// TanStack Router의 (auth)/route.tsx(Layout Route + beforeLoad) → Next.js layout.tsx + RequireAuth
// 이 그룹 안의 페이지는 모두 RequireAuth를 거침 (페이지마다 검사를 넣지 않고 입구 한 곳에서 막음)
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
