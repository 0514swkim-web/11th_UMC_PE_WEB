"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { cn } from "../../utils/cn";

interface SearchFormProps {
  initialQuery: string;
}

// 검색창은 입력값(useState)과 제출(useRouter)이 필요해서 Client Component
// 검색 결과 목록은 Server Component(search-page.tsx)에 그대로 둠
export function SearchForm({ initialQuery }: SearchFormProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState(initialQuery);
  const hasQuery = initialQuery !== "";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    // TanStack Router의 navigate({ search: { query } }) 대신 주소 문자열로 이동
    router.push(
      nextQuery ? `/search?query=${encodeURIComponent(nextQuery)}` : "/search",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-white px-4 py-2",
        hasQuery ? "border-gray-200" : "border-gray-900 shadow-lg",
      )}
    >
      <img
        src="/icons/movie-icons/search.svg"
        alt=""
        className="h-4 w-4 opacity-60"
      />
      <input
        aria-label="검색어"
        placeholder="예: 스파이더맨"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
      {searchText && (
        <button
          type="button"
          onClick={() => setSearchText("")}
          aria-label="검색어 지우기"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100"
        >
          <img
            src="/icons/movie-icons/close.svg"
            alt=""
            className="h-3.5 w-3.5 opacity-60"
          />
        </button>
      )}
      <button
        type="submit"
        className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-700"
      >
        {hasQuery ? "다시 검색" : "검색"}
      </button>
    </form>
  );
}
