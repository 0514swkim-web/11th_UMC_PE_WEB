# 5주차 FE: API 요청과 서버 데이터 연동

> 한 줄 요약: **로컬 배열 대신 TMDB 서버에서 영화를 받아 온다.** 요청은 시간이 걸리고 실패할 수 있으니, 화면은 "로딩 / 오류 / 빈 결과 / 성공" 네 가지 상태를 모두 준비해야 한다.

## 1. 핵심 개념

| 개념 | 쉬운 설명 | 비유 |
|---|---|---|
| **API** | 프로그램끼리 데이터를 주고받는 약속 (주소 + 방법 + 응답 모양) | 식당 메뉴판 |
| **HTTP 요청·응답** | 메서드(GET 등) + URL + header로 요청 → 상태 코드 + body로 응답 | 주문서와 영수증 |
| **상태 코드** | 200 성공, 401 인증 실패, 404 없음, 500 서버 오류 | 택배 배송 상태 |
| **비동기 / Promise** | 결과가 나중에 오는 작업. pending → fulfilled / rejected | 진동벨 |
| **`async` / `await`** | Promise를 위에서 아래로 읽히게 쓰는 문법. 오류는 `try...catch` | 진동벨 울릴 때까지 기다리기 |
| **`fetch`** | 브라우저 기본 요청 함수. **404여도 reject 안 함** → `response.ok` 직접 확인 | 직접 전화 주문 |
| **ky** | fetch를 감싼 라이브러리. 기본 주소·header 설정, 실패 상태 코드면 오류 던짐 | 단골 배달 앱 |
| **환경 변수 `VITE_`** | `.env.local`에 둔 값. 코드에서 `import.meta.env`로 읽음. **빌드 결과에 노출됨** | 설정 메모 |
| **`useEffect`로 요청** | 화면이 그려진 뒤 요청, 의존값(검색어 등)이 바뀌면 다시 요청 | 가게 문 열고 재고 확인 |
| **CORS** | 다른 출처(포트만 달라도)의 응답을 읽으려면 **서버가 허용**해야 함 | 다른 건물 출입증 |

## 2. 이번 주 실습 → 파일 위치

| 워크북 단원 | 실습 | 파일 |
|---|---|---|
| 비동기 | Promise 상태, then·async/await | [src/examples/](../../umcine/src/examples) |
| 3 | TMDB 환경 변수와 응답 타입 | [env.ts](../../umcine/src/config/env.ts), [.env.example](../../umcine/.env.example), [models.ts](../../umcine/src/api/movies/models.ts) |
| 순수 fetch | 인기 영화 요청 | [get-movies-with-fetch.ts](../../umcine/src/api/movies/get-movies-with-fetch.ts) |
| ky | 인스턴스 + 목록·검색·상세 함수 | [tmdb-client.ts](../../umcine/src/api/tmdb-client.ts), [get-movies.ts](../../umcine/src/api/movies/get-movies.ts), [search-movies.ts](../../umcine/src/api/movies/search-movies.ts), [get-movie-detail.ts](../../umcine/src/api/movies/get-movie-detail.ts) |
| 화면 연결 | 목록·검색·상세 4가지 상태 | [src/pages/movies/](../../umcine/src/pages/movies) |
| BE 5주차 미션 | 회원 API 화면 `/members` (Spring 서버 호출, CORS 확인) | [member-api-page.tsx](../../umcine/src/pages/members/member-api-page.tsx), [umc-client.ts](../../umcine/src/api/umc-client.ts) |

### 필수 미션 키워드 → 구현
| 키워드 | 구현 |
|---|---|
| 순수 `fetch`로 인기 영화 1회 | `get-movies-with-fetch.ts` (`response.ok` 확인) |
| ky 인스턴스 | `tmdb-client.ts` (`baseUrl`, `Authorization: Bearer`) |
| 목록·검색·상세를 TMDB 데이터로 | `get-movies.ts`, `search-movies.ts`, `get-movie-detail.ts` |
| 로딩·오류·빈 결과·성공 구분 | 각 페이지의 `불러오는 중이에요` / 오류 문구 / `조건에 맞는 영화가 없어요.` |
| 없는 영화 404 구분 | 상세 페이지에서 404면 "영화를 찾을 수 없어요." |
| TMDB 출처 표기 | [footer.tsx](../../umcine/src/components/layout/footer.tsx) |
| 로컬 영화 데이터 제거 | `src/data/` 삭제 |

```bash
cd umcine
copy .env.example .env.local   # 토큰을 직접 채우기 (Git에 안 올라감)
pnpm dev
```

## 3. 자주 하는 실수
- `fetch`가 404에서도 성공으로 끝나는 걸 모르고 `response.json()`부터 호출.
- `.env.local` 수정 후 개발 서버를 재시작하지 않기 → 값이 반영 안 된다.
- `VITE_` 접두사 빼먹기 → `import.meta.env`에 안 들어온다.
- `useEffect` 의존성 배열에 검색어를 안 넣기 → 검색어를 바꿔도 다시 요청하지 않는다.
- 늦게 도착한 이전 요청이 최신 결과를 덮어쓰기 → cleanup에서 무시 처리.

## 4. 스스로 점검하기
<details><summary>Q1. ky와 fetch의 가장 큰 차이 한 가지는?</summary>

ky는 4xx/5xx 응답에서 오류를 던진다. fetch는 네트워크 실패에서만 reject한다.
</details>
<details><summary>Q2. TMDB 토큰을 VITE_ 변수에 둬도 안전한가?</summary>

아니다. 빌드 결과에 포함돼 누구나 볼 수 있다. 학습용이라 쓰는 것이고, 진짜 비밀은 서버에서 관리한다.
</details>
<details><summary>Q3. <code>localhost:5173</code>에서 <code>localhost:8080</code>을 부르면 왜 CORS가 필요한가?</summary>

포트가 다르면 다른 출처라서, 서버가 `Access-Control-Allow-Origin`으로 허용해야 브라우저가 응답을 읽게 해 준다.
</details>
