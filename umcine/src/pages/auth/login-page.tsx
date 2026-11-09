import { useState } from "react";
import { Link } from "@tanstack/react-router";

const DEFAULT_FORM = {
  email: "",
  password: "",
};

type LoginFormKey = keyof typeof DEFAULT_FORM;

const labelClass = "mb-2 block text-sm font-semibold text-gray-900";
const inputClass =
  "h-12 w-full rounded-lg border border-gray-200 bg-white pr-4 pl-11 text-sm outline-none placeholder:text-gray-400 focus:border-blue-600";
const iconClass =
  "absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 opacity-60";

export function LoginPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handleChangeField = (key: LoginFormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 8주차에서 로그인 API 요청 추가
  };

  return (
    <div className="mx-auto w-full max-w-[478px] px-6 py-24">
      <h1 className="text-3xl font-bold">로그인</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            이메일
          </label>
          <div className="relative">
            <img src="/icons/movie-icons/mail.svg" alt="" className={iconClass} />
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChangeField("email", e.target.value)}
              placeholder="name@example.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            비밀번호
          </label>
          <div className="relative">
            <img src="/icons/movie-icons/lock.svg" alt="" className={iconClass} />
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              placeholder="비밀번호"
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
        >
          로그인
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        처음이신가요?{" "}
        <Link to="/signup" className="font-semibold text-blue-600">
          회원가입
        </Link>
      </p>
    </div>
  );
}
