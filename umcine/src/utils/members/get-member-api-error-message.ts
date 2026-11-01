import { isHTTPError } from "ky";

// HTTP 오류(서버가 응답함)와 네트워크·CORS 오류(응답을 못 읽음)를 나눠서 안내
export function getMemberApiErrorMessage(error: unknown) {
  if (isHTTPError(error)) {
    if (error.response.status === 404) return "존재하지 않는 유저예요.";
    return `요청에 실패했어요. (${error.response.status})`;
  }

  return "서버에 연결하지 못했어요. 서버 실행과 CORS 설정을 확인해 주세요.";
}
