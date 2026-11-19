import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { MemberInfo } from "../../api/members/me";
import { useMeQuery } from "../../hooks/use-me-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

const labelClass = "mb-2 block text-sm font-semibold text-gray-900";
const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-600";

export function MyInfoEditPage() {
  const meQuery = useMeQuery();

  if (meQuery.isLoading) {
    return (
      <p className="py-32 text-center text-sm text-gray-500">
        내 정보를 불러오는 중이에요.
      </p>
    );
  }
  if (!meQuery.data) {
    return (
      <p className="py-32 text-center text-sm text-gray-500">
        로그인이 필요해요.{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          로그인하기
        </Link>
      </p>
    );
  }

  // 내 정보를 받은 뒤에 폼을 그려야 닉네임 입력칸의 처음 값이 서버 값으로 채워짐
  // (useState의 처음 값은 첫 렌더링 때 한 번만 정해지기 때문)
  return <MyInfoEditForm me={meQuery.data} />;
}

function MyInfoEditForm({ me }: { me: MemberInfo }) {
  const navigate = useNavigate();
  const updateMeMutation = useUpdateMeMutation();

  const [nickname, setNickname] = useState(me.nickname);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const trimmedNickname = nickname.trim();
  const isNicknameValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  const showNicknameError = !isNicknameValid;
  const canSubmit = isNicknameValid && !updateMeMutation.isPending;

  // 미리보기 주소를 바꾸거나 페이지를 떠나면 브라우저 메모리에서 정리
  useEffect(() => {
    if (!profileImageUrl) return;
    return () => URL.revokeObjectURL(profileImageUrl);
  }, [profileImageUrl]);

  const handleChangeProfileImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PROFILE_IMAGE_SIZE) {
      alert("프로필 이미지는 5MB 이하만 선택할 수 있어요.");
      e.target.value = "";
      return;
    }

    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    // 캐시 갱신·알림은 useUpdateMeMutation의 onSuccess가 하고,
    // 이 화면에서만 필요한 "내 정보로 돌아가기"는 mutate의 두 번째 인자에 넣음
    updateMeMutation.mutate(
      { nickname: trimmedNickname },
      { onSuccess: () => navigate({ to: "/me" }) },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-[1200px] px-6 py-10"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">내 정보 수정</h1>
          <p className="mt-2 text-sm text-gray-500">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/40"
        >
          {updateMeMutation.isPending ? "저장 중" : "변경사항 저장"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <label className="relative h-20 w-20 cursor-pointer">
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="선택한 프로필 이미지"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="/icons/movie-icons/person.svg"
                  alt=""
                  className="h-9 w-9"
                />
              )}
            </span>
            <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-900 bg-white">
              <img src="/icons/movie-icons/edit.svg" alt="" className="h-3 w-3" />
            </span>
            <input
              type="file"
              accept="image/*"
              aria-label="프로필 이미지 선택"
              onChange={handleChangeProfileImage}
              className="sr-only"
            />
          </label>
          <p className="mt-3 text-sm font-semibold">프로필 이미지</p>
          <p className="mt-1 text-xs text-gray-400">선택 사항 · 최대 5MB</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="nickname" className={labelClass}>
              닉네임
            </label>
            <div className="relative">
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={updateMeMutation.isPending}
                className={`${inputClass} pr-20`}
              />
              {/* 중복이면 서버가 409로 막아 줌. 미리 확인하는 버튼은 아직 연결 안 함 */}
              <button
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-semibold text-blue-600"
              >
                중복 확인
              </button>
            </div>
            {showNicknameError && (
              <p className="mt-2 text-xs text-red-600">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={me.email}
              readOnly
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <section className="mt-40 flex items-center justify-between gap-4 rounded-lg border border-red-300 bg-red-50 p-5">
        <div>
          <h2 className="text-sm font-semibold text-red-600">회원 탈퇴</h2>
          <p className="mt-1 text-xs text-red-600">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
            없습니다.
          </p>
        </div>
        {/* 8주차 이후 회원 탈퇴 API 연결 */}
        <button
          type="button"
          className="shrink-0 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          회원 탈퇴
        </button>
      </section>
    </form>
  );
}
