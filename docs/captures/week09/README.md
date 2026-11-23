# 9주차 캡처 체크리스트

`umcine`을 Next.js(App Router)로 옮긴 뒤 `pnpm build` → `next start`로 띄운 화면을 Chrome(headless)으로 찍었다.
로그인하지 않은 상태라 개인 정보는 없다.

| 파일 이름 | 무엇을 찍나 | 확인한 것 | 상태 |
|---|---|---|---|
| `01-home.png` | `/` 영화 목록 (Server Component에서 TMDB 조회) | 서버 HTML에 카드 20개, 헤더 "영화" 밑줄(`usePathname`) | ✅ |
| `02-home-page2.png` | `/?page=2` | 페이지 번호가 `Link`로 바뀌어 주소에 남음, 첫 영화가 바뀜 | ✅ |
| `03-search-empty.png` | `/search` 검색어 없음 | 검색창만 Client Component | ✅ |
| `04-search-result.png` | `/search?query=인터스텔라` | 검색창 제출 → `router.push` → 서버에서 검색 결과 4편 | ✅ |
| `05-detail-155.png` | `/movies/155` 상세 | `generateMetadata` 탭 제목 "다크 나이트 \| UMCine", 포스터·배경 `next/image`(webp) | ✅ |
| `06-me-redirect-login.png` | 로그인 없이 `/me` | `(auth)/layout.tsx`의 `RequireAuth`가 `/login`으로 보냄 | ✅ |
| `07-login.png` | `/login` | `page.tsx`는 Server(metadata), 폼은 Client | ✅ |
| `08-not-found.png` | 없는 주소 | `app/not-found.tsx` | ✅ |
