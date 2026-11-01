import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="페이지 이동" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-30"
      >
        <img src="/icons/movie-icons/chevron-left.svg" alt="" className="h-4 w-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "h-8 w-8 rounded-md text-sm",
            page === currentPage
              ? "bg-gray-900 font-semibold text-white"
              : "text-gray-600 hover:bg-gray-100",
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 disabled:opacity-30"
      >
        <img src="/icons/movie-icons/chevron-right.svg" alt="" className="h-4 w-4" />
      </button>
    </nav>
  );
}