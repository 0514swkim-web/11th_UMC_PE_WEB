// TMDB는 "2026-07-29" 형식으로 주고, 개봉일이 없으면 빈 문자열을 줌
export function formatReleaseDate(releaseDate: string) {
  return releaseDate ? releaseDate.replaceAll("-", ".") : "개봉일 미정";
}
