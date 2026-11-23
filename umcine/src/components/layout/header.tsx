import Link from "next/link";
import { Suspense } from "react";
import { HeaderAuthButton } from "./header-auth-button";
import { HeaderNav, HeaderNavFallback } from "./header-nav";

// 9주차: 헤더 전체를 Client Component로 만들지 않고, 상호작용·브라우저 상태가 필요한 부분만 분리
// - 로고, 검색 아이콘: 항상 같음 → Server Component (브라우저로 JS를 안 보냄)
// - 메뉴 밑줄: 현재 주소(usePathname)가 필요 → HeaderNav (Client)
// - 로그인/마이페이지 버튼: localStorage 토큰 + 내 정보 query → HeaderAuthButton (Client)
export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icons/movie-icons/movie.svg" alt="" className="h-6 w-6" />
            <span className="text-lg font-bold">UMCine</span>
          </Link>

          {/* usePathname()은 요청을 받아야 아는 값 → Suspense로 감싸야 나머지 헤더를 미리 만들 수 있음
              fallback: 밑줄 없는 같은 메뉴 (주소를 알게 되면 밑줄이 있는 메뉴로 바뀜) */}
          <Suspense fallback={<HeaderNavFallback />}>
            <HeaderNav />
          </Suspense>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="검색"
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
          >
            <img src="/icons/movie-icons/search.svg" alt="" className="h-5 w-5" />
          </Link>
          <HeaderAuthButton />
        </div>
      </div>
    </header>
  );
}
