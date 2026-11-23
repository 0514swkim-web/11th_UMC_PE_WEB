"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/cn";

const navLinkClass = "text-sm text-gray-600 hover:text-gray-900";
const activeClass = "font-semibold text-gray-900 underline underline-offset-8";

// TanStack Router의 <Link>{({ isActive }) => ...}</Link> 대신
// usePathname()으로 현재 주소를 읽어서 직접 비교
const NAV_ITEMS = [
  { href: "/", label: "영화", exact: true },
  { href: "/search", label: "검색", exact: false },
  { href: "/members", label: "회원 API", exact: false },
  { href: "/me", label: "내 정보", exact: false }, // /me/edit에서도 밑줄
];

// 주소를 읽기 전에 미리 만들어 두는 메뉴 (밑줄 없음)
export function HeaderNavFallback() {
  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map(({ href, label }) => (
        <Link key={href} href={href} className={navLinkClass}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderNav() {
  const pathname = usePathname(); // ?query= 같은 검색어는 빠진 경로만 줌

  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map(({ href, label, exact }) => {
        const isActive = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(navLinkClass, isActive && activeClass)}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
