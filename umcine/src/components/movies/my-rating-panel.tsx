"use client";

import { useState } from "react";
import Link from "next/link";
import type { MemberRating } from "../../api/members/models";
import { useMeQuery } from "../../hooks/use-me-query";
import {
  useMyRatingMutations,
  useMyRatingsQuery,
} from "../../hooks/use-my-ratings";
import { useAuthHydrated } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const MAX_COMMENT_LENGTH = 500;

interface MyRatingPanelProps {
  movieId: number;
}

// 영화 상세 오른쪽 "내 평점" 칸
export function MyRatingPanel({ movieId }: MyRatingPanelProps) {
  const meQuery = useMeQuery();
  const myRatingsQuery = useMyRatingsQuery();
  const hasHydrated = useAuthHydrated();

  // 토큰을 읽기 전에는 "로그인하면…"을 먼저 보여 주지 않음 (로그인한 사람에게 잠깐 보이는 깜빡임 방지)
  if (hasHydrated && !meQuery.data && !meQuery.isLoading) {
    return (
      <PanelFrame>
        <p className="mt-3 text-sm text-gray-500">
          <Link href="/login" className="font-semibold text-blue-600">
            로그인
          </Link>
          하면 평점을 남길 수 있어요.
        </p>
      </PanelFrame>
    );
  }
  if (!hasHydrated || meQuery.isLoading || myRatingsQuery.isPending) {
    return (
      <PanelFrame>
        <p className="mt-3 text-sm text-gray-500">내 평점을 불러오는 중이에요.</p>
      </PanelFrame>
    );
  }
  if (myRatingsQuery.isError) {
    return (
      <PanelFrame>
        <p className="mt-3 text-sm text-red-600">내 평점을 불러오지 못했어요.</p>
      </PanelFrame>
    );
  }

  // 내 평점 목록 중 이 영화에 남긴 것 (없으면 undefined → 새로 등록)
  const myRating = myRatingsQuery.data.find(
    (rating) => rating.movieId === movieId,
  );

  // key가 바뀌면 폼을 새로 만들어서 별점·후기 입력칸이 서버 값으로 다시 채워짐
  // (등록 → 수정 상태로, 삭제 → 빈 상태로 바뀔 때)
  return (
    <PanelFrame>
      <MyRatingForm
        key={myRating?.ratingId ?? "new"}
        movieId={movieId}
        myRating={myRating}
      />
    </PanelFrame>
  );
}

function PanelFrame({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full border-gray-200 lg:w-72 lg:border-l lg:pl-10">
      <h2 className="font-bold">내 평점</h2>
      {children}
    </aside>
  );
}

interface MyRatingFormProps {
  movieId: number;
  myRating: MemberRating | undefined;
}

function MyRatingForm({ movieId, myRating }: MyRatingFormProps) {
  const [score, setScore] = useState(myRating?.score ?? 0);
  const [comment, setComment] = useState(myRating?.comment ?? "");
  const { createMutation, updateMutation, deleteMutation } =
    useMyRatingMutations();

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;
  const canSubmit = score >= 1 && score <= 5 && !isPending;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    // 후기는 선택이라 비어 있으면 null로 보냄
    const trimmedComment = comment.trim() || null;

    if (myRating) {
      updateMutation.mutate({
        ratingId: myRating.ratingId,
        body: { score, comment: trimmedComment },
      });
    } else {
      createMutation.mutate({ movieId, score, comment: trimmedComment });
    }
  };

  const handleDelete = () => {
    if (!myRating || isPending) return;
    if (!confirm("내 평점을 삭제할까요?")) return;
    deleteMutation.mutate(myRating.ratingId);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="mt-1 text-xs text-gray-400">
        {myRating
          ? "남긴 평점을 수정하거나 삭제할 수 있어요."
          : "별점을 선택하고 한 줄 평을 남겨 보세요."}
      </p>

      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setScore(value)}
            disabled={isPending}
            aria-label={`${value}점`}
            aria-pressed={value === score}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded border",
              value <= score
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200 bg-white",
            )}
          >
            <img
              src={
                value <= score
                  ? "/icons/movie-icons/star.svg"
                  : "/icons/movie-icons/star-outline.svg"
              }
              alt=""
              className="h-4 w-4"
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={MAX_COMMENT_LENGTH}
        disabled={isPending}
        placeholder="영화를 보고 느낀 점을 남겨 보세요."
        className="mt-4 h-24 w-full resize-none rounded-md border border-gray-200 bg-white p-3 text-sm outline-none focus:border-gray-400"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-3 w-full rounded-md bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-900/40"
      >
        {createMutation.isPending || updateMutation.isPending
          ? "저장 중"
          : myRating
            ? "평점 수정"
            : "평점 저장"}
      </button>

      {myRating && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="mt-2 w-full rounded-md border border-red-300 bg-white py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {deleteMutation.isPending ? "삭제 중" : "평점 삭제"}
        </button>
      )}
    </form>
  );
}
