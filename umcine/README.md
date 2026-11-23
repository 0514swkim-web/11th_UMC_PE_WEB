# UMCine

TMDB 인기 영화를 보고, 우리 Spring 서버(`umc-web-be/movie`)에 평점과 즐겨찾기를 남기는 영화 서비스.
2주차 React + Vite로 시작해 9주차에 Next.js(App Router)로 옮겼다.

## 실행

```bash
cp .env.example .env.local   # 값 채우기
pnpm install
pnpm dev                     # http://localhost:5173 (백엔드 CORS가 5173만 허용)
pnpm build && pnpm start     # 빌드 결과로 실행
```

## 환경 변수

| 이름 | 어디서 읽나 | 설명 |
|---|---|---|
| `TMDB_API_BASE_URL` | 서버만 | TMDB API 주소 |
| `TMDB_ACCESS_TOKEN` | 서버만 | TMDB 토큰 (브라우저로 보내지 않음) |
| `NEXT_PUBLIC_UMC_API_BASE_URL` | 서버 + 브라우저 | Spring 서버 주소 |

## 폴더

| 폴더 | 내용 |
|---|---|
| `src/app/` | 주소와 1:1인 `page.tsx`, `layout.tsx`, Route Handler(`api/`) |
| `src/screens/` | 페이지 본문 컴포넌트 (`src/pages`는 Next.js가 Pages Router로 읽어서 이름을 바꿈) |
| `src/components/` | 공통 컴포넌트 |
| `src/api/` | 요청 함수 (`import "server-only"`가 붙은 파일은 서버 전용) |
| `src/hooks/`, `src/stores/` | TanStack Query 훅, Zustand 스토어 |
