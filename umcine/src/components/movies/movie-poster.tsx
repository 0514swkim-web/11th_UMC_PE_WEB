import { cn } from "../../utils/cn";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
  className?: string;
}

// poster_path가 없으면 <img> 대신 같은 크기의 회색 영역을 보여 줌
export function MoviePoster({ posterPath, title, className }: MoviePosterProps) {
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
    <img
      src={posterUrl}
      alt={`${title} 포스터`}
      className={cn("aspect-[2/3] object-cover", className)}
    />
  );
}
