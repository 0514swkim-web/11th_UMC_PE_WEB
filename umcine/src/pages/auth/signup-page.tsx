import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { checkEmail } from "../../api/members/check-email";
import { checkNickname } from "../../api/members/check-nickname";
import { signup } from "../../api/members/signup";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

// 여러 곳에서 반복되는 Tailwind 클래스
const labelClass = "mb-2 block text-sm font-semibold text-gray-900";
const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600";
const checkButtonClass =
  "absolute top-1/2 right-4 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:cursor-not-allowed";
const errorClass = "mt-2 text-xs text-red-600";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // 입력값의 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 제출 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;
      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;
    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmail(form.email.trim())
          : await checkNickname(form.nickname.trim());
      const isAvailable = response.available;
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));
      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // 폼 제출 시 페이지 새로고침 방지
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });
      alert(response.message);
      navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // noValidate는 폼 제출 시 브라우저의 기본 유효성 검사를 끔
  return (
    <div className="mx-auto w-full max-w-[478px] px-6 py-24">
      <h1 className="text-3xl font-bold">회원가입</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            이메일
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              placeholder="example@email.com"
              disabled={duplicateCheck.email.isChecking}
              className={`${inputClass} pr-20`}
            />
            <button
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
              className={checkButtonClass}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showEmailError && (
            <p className={errorClass}>이메일 형식을 확인해 주세요.</p>
          )}
        </div>

        <div>
          <label htmlFor="nickname" className={labelClass}>
            닉네임
          </label>
          <div className="relative">
            <input
              id="nickname"
              type="text"
              value={form.nickname}
              onChange={(e) => handleChangeField("nickname", e.target.value)}
              placeholder="2~12자"
              disabled={duplicateCheck.nickname.isChecking}
              className={`${inputClass} pr-20`}
            />
            <button
              type="button"
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
              className={checkButtonClass}
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showNicknameError && (
            <p className={errorClass}>닉네임은 2~12자로 입력해 주세요.</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => handleChangeField("password", e.target.value)}
            placeholder="8자 이상"
            className={inputClass}
          />
          <p className="mt-2 text-xs text-gray-400">
            영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요
          </p>
          {showPasswordError && (
            <p className={errorClass}>비밀번호를 다시 한 번 확인해주세요.</p>
          )}
        </div>

        <div>
          <label htmlFor="passwordConfirm" className={labelClass}>
            비밀번호 확인
          </label>
          <input
            id="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={(e) =>
              handleChangeField("passwordConfirm", e.target.value)
            }
            placeholder="다시 입력"
            className={inputClass}
          />
          {showPasswordConfirmError && (
            <p className={errorClass}>비밀번호가 일치하지 않아요.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="h-12 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600/40"
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        이미 계정이 있나요?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          로그인
        </Link>
      </p>
    </div>
  );
}
