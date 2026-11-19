import { useNavigate } from "@tanstack/react-router";
import {
  useMyFavoritesQuery,
  useToggleFavoriteMutation,
} from "../hooks/use-favorites";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
}

// 영화 카드 오른쪽 위 북마크 버튼
// 8주차: 브라우저 저장(bookmark-store) 대신 서버 즐겨찾기 목록(GET /favorites)으로 표시
// 카드마다 여부를 따로 묻지 않고, 목록 캐시 하나를 여러 카드가 같이 봄 → 요청 1번
export function BookmarkButton({ movieId }: BookmarkButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const favoritesQuery = useMyFavoritesQuery();
  const toggleMutation = useToggleFavoriteMutation();

  const isBookmarked =
    favoritesQuery.data?.some((favorite) => favorite.movieId === movieId) ??
    false;

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인하면 즐겨찾기를 사용할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (toggleMutation.isPending) return;
    toggleMutation.mutate({ movieId, isFavorite: isBookmarked });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={toggleMutation.isPending}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      className={cn(
        "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md shadow disabled:opacity-60",
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
