import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

const navLinkClass = "text-sm text-gray-600 hover:text-gray-900";
const activeClass = "font-semibold text-gray-900 underline underline-offset-8";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/movie-icons/movie.svg" alt="" className="h-6 w-6" />
            <span className="text-lg font-bold">UMCine</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link to="/" activeOptions={{ exact: true }}>
              {({ isActive }) => (
                <span className={cn(navLinkClass, isActive && activeClass)}>영화</span>
              )}
            </Link>
            <Link to="/search">
              {({ isActive }) => (
                <span className={cn(navLinkClass, isActive && activeClass)}>검색</span>
              )}
            </Link>
            <span className={cn(navLinkClass, "cursor-not-allowed text-gray-400")}>
              내 정보
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            aria-label="검색"
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100"
          >
            <img src="/icons/movie-icons/search.svg" alt="" className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}