import Image from "next/image";
import { cn } from "../../utils/cn";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
  className?: string;
  // 화면에서 포스터가 차지하는 너비 → 브라우저가 알맞은 크기의 파일을 고름 (워크북 5.2)
  sizes?: string;
  // 첫 화면에 바로 보이는 큰 이미지(상세 포스터)는 지연 로딩하지 않고 먼저 받음
  eager?: boolean;
}

// poster_path가 없으면 이미지 대신 같은 크기의 회색 영역을 보여 줌
// 9주차: <img> → next/image. TMDB w500 원본(jpg) 대신 /_next/image에서 필요한 크기의 webp를 받음
export function MoviePoster({
  posterPath,
  title,
  className,
  sizes = "(min-width: 1280px) 220px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  eager = false,
}: MoviePosterProps) {
  const posterUrl = getTmdbPosterUrl(posterPath);

  if (!posterUrl) {
    return (
      <div
        className={cn(
          "flex aspect-[2/3] items-center justify-center bg-gray-200 text-xs text-gray-500",
          className,
        )}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <Image
      src={posterUrl}
      alt={`${title} 포스터`}
      // width·height는 실제 표시 크기가 아니라 비율(2:3)과 자리를 잡는 값
      width={500}
      height={750}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={cn("aspect-[2/3] object-cover", className)}
    />
  );
}
