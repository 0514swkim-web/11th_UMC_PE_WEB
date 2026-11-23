import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchLoading, SearchPage } from "../../screens/movies/search-page";

export const metadata: Metadata = {
  title: "영화 검색",
  description: "보고 싶은 영화를 제목으로 찾아보세요.",
};

// TanStack Router routes/search.tsx의 validateSearch 대신 searchParams를 직접 확인
export default function SearchRoutePage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchScreen({
  searchParams,
}: Pick<PageProps<"/search">, "searchParams">) {
  const { query } = await searchParams;
  return <SearchPage query={typeof query === "string" ? query : ""} />;
}
