import "server-only";

// 서버에서만 쓰는 값: TMDB 토큰은 이제 브라우저로 보내지 않음
// (Vite 때는 VITE_TMDB_ACCESS_TOKEN이 브라우저 번들에 그대로 들어 있었음)
// "server-only"를 import하면 Client Component에서 이 파일을 불러올 때 빌드 오류가 남
const tmdbApiBaseUrl = process.env.TMDB_API_BASE_URL;
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN;

if (!tmdbApiBaseUrl || !tmdbAccessToken) {
  throw new Error("TMDB 환경 변수(TMDB_API_BASE_URL, TMDB_ACCESS_TOKEN)가 필요해요.");
}

export const serverEnv = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
};
