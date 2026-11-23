// 로그인 후 돌아갈 주소: /login?redirect=/me 의 "/me"
// 다른 사이트 주소(https://..., //evil.com)가 들어오면 무시하고 홈으로 보냄
export function getRedirectPath(): string {
  const value = new URLSearchParams(window.location.search).get("redirect");
  if (value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")) {
    return value;
  }
  return "/";
}
