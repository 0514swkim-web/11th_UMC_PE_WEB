import type { Metadata } from "next";
import { Suspense } from "react";
import {
  MovieListLoading,
  MovieListPage,
} from "../screens/movies/movie-list-page";
import { parsePage } from "../utils/parse-page";

export const metadata: Metadata = {
  // layout의 title.template은 하위 경로에만 적용됨 → 같은 위치의 홈은 absolute로 직접 지정
  title: { absolute: "UMCine | 인기 영화" },
  description: "TMDB에서 지금 인기 있는 영화를 둘러보세요.",
};

// TanStack Router routes/index.tsx → Next.js app/page.tsx ("/")
// ?page=는 요청을 받아야 알 수 있는 값 → Suspense 안에서 읽음 (워크북 2.4)
export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <Suspense fallback={<MovieListLoading />}>
      <HomeScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeScreen({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { page } = await searchParams;
  return <MovieListPage page={parsePage(page)} />;
}
