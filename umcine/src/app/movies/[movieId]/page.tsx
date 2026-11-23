import type { Metadata } from "next";
import { Suspense } from "react";
import { getMovieDetail } from "../../../api/movies/get-movie-detail";
import {
  MovieDetailLoading,
  MovieDetailPage,
  parseMovieId,
} from "../../../screens/movies/movie-detail-page";
import { getTmdbPosterUrl } from "../../../utils/movies/tmdb-image";

// TanStack Router routes/movies.$movieId.tsx → Next.js app/movies/[movieId]/page.tsx

// 영화마다 다른 탭 제목·설명·공유 이미지 (워크북 5.4)
// getMovieDetail은 "use cache"라 페이지 본문과 같은 영화를 두 번 요청하지 않음
export async function generateMetadata({
  params,
}: PageProps<"/movies/[movieId]">): Promise<Metadata> {
  const { movieId } = await params;
  const parsedMovieId = parseMovieId(movieId);
  const movie = parsedMovieId
    ? await getMovieDetail(parsedMovieId).catch(() => null)
    : null;

  if (!movie) {
    return { title: "영화 정보" };
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const description = movie.overview || `${movie.title} 영화 정보`;

  return {
    title: movie.title,
    description,
    openGraph: {
      title: `${movie.title} | UMCine`,
      description,
      images: posterUrl ? [posterUrl] : [],
    },
  };
}

export default function MovieDetailRoutePage({
  params,
}: PageProps<"/movies/[movieId]">) {
  return (
    <Suspense fallback={<MovieDetailLoading />}>
      <MovieDetailScreen params={params} />
    </Suspense>
  );
}

async function MovieDetailScreen({
  params,
}: Pick<PageProps<"/movies/[movieId]">, "params">) {
  const { movieId } = await params;
  return <MovieDetailPage movieId={movieId} />;
}
