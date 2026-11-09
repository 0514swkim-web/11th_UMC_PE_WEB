import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMyInfoStore } from "../../stores/my-info-store";

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

const labelClass = "mb-2 block text-sm font-semibold text-gray-900";
const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-600";

export function MyInfoEditPage() {
  const savedNickname = useMyInfoStore((state) => state.nickname);
  const email = useMyInfoStore((state) => state.email);
  const updateNickname = useMyInfoStore((state) => state.updateNickname);
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(savedNickname);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const trimmedNickname = nickname.trim();
  const isNicknameValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  const showNicknameError = !isNicknameValid;

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

  const handleSave = () => {
    if (!isNicknameValid) return;

    // 8주차에서 내 정보 수정 API 요청으로 교체
    updateNickname(trimmedNickname);
    navigate({ to: "/me" });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">내 정보 수정</h1>
          <p className="mt-2 text-sm text-gray-500">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="button"
          disabled={!isNicknameValid}
          onClick={handleSave}
          className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/40"
        >
          변경사항 저장
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
                className={`${inputClass} pr-20`}
              />
              {/* 8주차에서 닉네임 중복 확인 연결 */}
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
              value={email}
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
    </div>
  );
}
