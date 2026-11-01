import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(movieId)}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      className={cn(
        "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md shadow",
        isBookmarked ? "bg-blue-600" : "bg-white/90 hover:bg-white",
      )}
    >
      <img
        src={
          isBookmarked
            ? "/icons/movie-icons/bookmark.svg"
            : "/icons/movie-icons/bookmark-outline.svg"
        }
        alt=""
        className={cn("h-4 w-4", isBookmarked && "brightness-0 invert")}
      />
    </button>
  );
}
