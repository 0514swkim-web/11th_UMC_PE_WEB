import Link from "next/link";
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // 페이지 번호를 붙일 주소 (예: "/" → "/?page=2", "/me" → "/me?page=2")
  basePath: string;
}

// 9주차: 버튼 + useState 대신 주소(?page=)로 페이지를 바꿈
// → onClick이 없어서 Server Component에서도 쓸 수 있고, 새로고침·뒤로 가기에도 페이지가 유지됨
export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hrefOf = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  const arrowClass =
    "flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100";
  const disabledArrowClass = "pointer-events-none opacity-30";

  return (
    <nav aria-label="페이지 이동" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={hrefOf(Math.max(currentPage - 1, 1))}
        aria-label="이전 페이지"
        aria-disabled={currentPage === 1}
        className={cn(arrowClass, currentPage === 1 && disabledArrowClass)}
      >
        <img src="/icons/movie-icons/chevron-left.svg" alt="" className="h-4 w-4" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={hrefOf(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-sm",
            page === currentPage
              ? "bg-gray-900 font-semibold text-white"
              : "text-gray-600 hover:bg-gray-100",
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={hrefOf(Math.min(currentPage + 1, totalPages))}
        aria-label="다음 페이지"
        aria-disabled={currentPage === totalPages}
        className={cn(arrowClass, currentPage === totalPages && disabledArrowClass)}
      >
        <img src="/icons/movie-icons/chevron-right.svg" alt="" className="h-4 w-4" />
      </Link>
    </nav>
  );
}
