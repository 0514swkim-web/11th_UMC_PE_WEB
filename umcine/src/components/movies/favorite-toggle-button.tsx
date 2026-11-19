import { useNavigate } from "@tanstack/react-router";
import {
  useFavoriteStatusQuery,
  useToggleFavoriteMutation,
} from "../../hooks/use-favorites";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

interface FavoriteToggleButtonProps {
  movieId: number;
}

// 영화 상세의 "즐겨찾기" 버튼
// 열 때 GET /favorites/{movieId}로 여부를 묻고, 누르면 POST 또는 DELETE
export function FavoriteToggleButton({ movieId }: FavoriteToggleButtonProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const statusQuery = useFavoriteStatusQuery(movieId);
  const toggleMutation = useToggleFavoriteMutation();

  const isFavorite = statusQuery.data?.isFavorite ?? false;
  const isLoading = Boolean(accessToken) && statusQuery.isPending;
  const isBusy = isLoading || toggleMutation.isPending;

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인하면 즐겨찾기를 사용할 수 있어요.");
      navigate({ to: "/login" });
      return;
    }
    if (isBusy) return;
    toggleMutation.mutate({ movieId, isFavorite });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isBusy}
      aria-pressed={isFavorite}
      className={cn(
        "mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60",
        isFavorite
          ? "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
          : "bg-blue-600 text-white hover:bg-blue-700",
      )}
    >
      <img
        src={
          isFavorite
            ? "/icons/movie-icons/bookmark.svg"
            : "/icons/movie-icons/bookmark-outline.svg"
        }
        alt=""
        className={cn("h-4 w-4", !isFavorite && "brightness-0 invert")}
      />
      {isLoading
        ? "확인 중"
        : toggleMutation.isPending
          ? "저장 중"
          : isFavorite
            ? "즐겨찾기됨"
            : "즐겨찾기"}
    </button>
  );
}
