# 5주차 캡처 체크리스트

준비: `umcine/.env.example`을 복사해 `.env.local`을 만들고 TMDB 토큰을 채운 뒤 `pnpm dev`.
아래 파일 이름 그대로 저장해 주세요.

| 파일 이름 | 무엇을 찍나 |
|---|---|
| `01-network-fetch.png` | F12 → Network에서 TMDB `movie/popular` 요청과 응답(Preview) |
| `02-list.png` | `/` TMDB 인기 영화 목록 |
| `03-search.png` | `/search?query=avatar` 검색 결과 |
| `04-detail.png` | `/movies/{TMDB id}` 상세 화면 |
| `05-loading.png` | 로딩 문구 (Network → Throttling `Slow 4G`로 느리게) |
| `06-error.png` | 오류 문구 (`.env.local` 토큰을 일부러 틀리게 또는 Network → Offline) |
| `07-empty.png` | 검색 결과 없음 (`/search?query=zzzzzzzz`) |
| `08-not-found.png` | 없는 영화 ID (`/movies/999999999`) |
| `09-tmdb-credit.png` | 푸터의 TMDB 출처 표기 |
| `10-build.png` | `pnpm build` 성공 + Console 오류 없음 |

> `/members` 화면(회원 API) 캡처는 **BE 5주차** 체크리스트에서 Spring 서버를 켠 뒤에 찍어요.
