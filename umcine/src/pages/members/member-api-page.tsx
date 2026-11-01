import { Link } from "@tanstack/react-router";
import { useState, type ReactNode, type SubmitEvent } from "react";
import { checkEmail } from "../../api/members/check-email";
import { checkNickname } from "../../api/members/check-nickname";
import { getMemberRatings } from "../../api/members/get-member-ratings";
import type { CheckAvailabilityResponse, MemberRating } from "../../api/members/models";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { MoviePoster } from "../../components/movies/movie-poster";
import { cn } from "../../utils/cn";
import { getMemberApiErrorMessage } from "../../utils/members/get-member-api-error-message";

type CheckResult =
  | { status: "success"; value: string; available: boolean }
  | { status: "error"; message: string };

// 우리 DB 평점 + TMDB 영화 정보를 화면에서 합친 타입
interface RatingWithMovie extends MemberRating {
  movieTitle: string | null;
  posterPath: string | null;
}

const inputClass =
  "flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500";
const buttonClass =
  "rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50";

interface SectionProps {
  title: string;
  endpoint: string;
  children: ReactNode;
}

function Section({ title, endpoint, children }: SectionProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 font-mono text-xs text-gray-400">{endpoint}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

interface CheckFormProps {
  label: string;
  placeholder: string;
  defaultValue: string;
  check: (value: string) => Promise<CheckAvailabilityResponse>;
}

function CheckForm({ label, placeholder, defaultValue, check }: CheckFormProps) {
  const [value, setValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setIsLoading(true);
    try {
      const response = await check(trimmedValue);
      setResult({ status: "success", value: trimmedValue, available: response.available });
    } catch (error) {
      setResult({ status: "error", message: getMemberApiErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          aria-label={label}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={inputClass}
        />
        <button type="submit" disabled={isLoading} className={buttonClass}>
          {isLoading ? "확인 중" : "중복 확인"}
        </button>
      </form>

      {result && (
        <p
          className={cn(
            "mt-3 rounded-md px-3 py-2 text-sm",
            result.status === "error"
              ? "bg-red-50 text-red-700"
              : result.available
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-800",
          )}
        >
          {result.status === "error"
            ? result.message
            : result.available
              ? `‘${result.value}’ 사용할 수 있어요.`
              : `‘${result.value}’ 이미 사용 중이에요.`}
        </p>
      )}
    </>
  );
}

function MemberRatings() {
  const [memberId, setMemberId] = useState("1");
  const [ratings, setRatings] = useState<RatingWithMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsedMemberId = Number(memberId);
    if (!Number.isInteger(parsedMemberId) || parsedMemberId <= 0) {
      setRatings(null);
      setErrorMessage("회원 번호는 양의 정수로 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const memberRatings = await getMemberRatings(parsedMemberId);
      // 영화 정보는 우리 서버가 아니라 TMDB에서 movieId로 가져옴 (실패해도 평점은 보여 줌)
      const ratingsWithMovie = await Promise.all(
        memberRatings.map(async (rating) => {
          try {
            const movie = await getMovieDetail(rating.movieId);
            return { ...rating, movieTitle: movie.title, posterPath: movie.poster_path };
          } catch {
            return { ...rating, movieTitle: null, posterPath: null };
          }
        }),
      );
      setRatings(ratingsWithMovie);
    } catch (error) {
      setRatings(null);
      setErrorMessage(getMemberApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          aria-label="회원 번호"
          placeholder="memberId (예: 1)"
          value={memberId}
          onChange={(event) => setMemberId(event.target.value)}
          className={inputClass}
        />
        <button type="submit" disabled={isLoading} className={buttonClass}>
          {isLoading ? "조회 중" : "평점 조회"}
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : ratings === null ? null : ratings.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">아직 남긴 평점이 없어요.</p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-200">
          {ratings.map((rating) => (
            <li key={rating.ratingId} className="flex gap-4 py-4">
              <Link to="/movies/$movieId" params={{ movieId: String(rating.movieId) }}>
                <MoviePoster
                  posterPath={rating.posterPath}
                  title={rating.movieTitle ?? `영화 ${rating.movieId}`}
                  className="w-14 rounded"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {rating.movieTitle ?? "영화 정보를 불러오지 못했어요."}
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    movieId {rating.movieId}
                  </span>
                </p>
                <p className="mt-1 text-sm text-yellow-500">
                  {"★".repeat(rating.score)}
                  <span className="text-gray-300">{"★".repeat(5 - rating.score)}</span>
                </p>
                <p className="mt-1 text-sm text-gray-600">{rating.comment ?? "코멘트 없음"}</p>
              </div>
              <p className="shrink-0 text-xs text-gray-400">
                {new Date(rating.createdAt).toLocaleDateString("ko-KR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function MemberApiPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-10">
      <h1 className="text-2xl font-bold">회원 API 연결</h1>
      <p className="mt-1 text-sm text-gray-500">
        우리 NestJS 서버(localhost:3000)의 API를 브라우저에서 직접 호출해요.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <Section title="닉네임 중복 체크" endpoint="GET /members/nickname/{nickname}">
          <CheckForm label="닉네임" placeholder="예: 수현" defaultValue="수현" check={checkNickname} />
        </Section>
        <Section title="이메일 중복 체크" endpoint="GET /members/email/{email}">
          <CheckForm
            label="이메일"
            placeholder="예: noco@umc.com"
            defaultValue="noco@umc.com"
            check={checkEmail}
          />
        </Section>
        <Section title="유저별 평점 조회" endpoint="GET /members/{memberId}/ratings">
          <MemberRatings />
        </Section>
      </div>
    </div>
  );
}
