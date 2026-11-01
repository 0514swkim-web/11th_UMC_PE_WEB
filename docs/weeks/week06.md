# 6주차 FE: TanStack Query로 서버 데이터 조회하기

> 한 줄 요약: **서버에서 받아 온 데이터는 "복사본"이다.** TanStack Query가 요청·로딩·오류 상태를 대신 관리하고, 받아 온 복사본을 캐시에 보관해 다시 쓴다. 언제까지 믿고 쓸지는 `staleTime`, 언제 버릴지는 `gcTime`으로 정한다.

## 1. 핵심 개념

| 개념 | 쉬운 설명 | 비유 |
|---|---|---|
| **클라이언트 상태** | 브라우저가 원본을 가진 값 (입력 중인 글, 현재 페이지 번호, 북마크) | 내 메모장 |
| **서버 상태** | 서버가 원본을 가진 값 (TMDB 영화). 브라우저에 있는 건 복사본이라 최신이 아닐 수 있음 | 도서관 책을 복사해 온 것 |
| **캐시** | 한 번 받은 데이터를 보관했다가 다시 꺼내 쓰기 → 네트워크 왕복이 줄어듦 | 복사본을 서랍에 보관 |
| **`QueryClient`** | 캐시와 기본 설정을 관리하는 객체 | 서랍장 관리인 |
| **`QueryClientProvider`** | 앱 전체에서 같은 `QueryClient`를 쓰게 감싸기 | 건물 전체에 관리인 배치 |
| **`useQuery`** | `queryKey`로 캐시를 찾고, 없거나 오래됐으면 `queryFn`으로 가져옴 | 관리인에게 서류 요청 |
| **`queryKey`** | 캐시를 구분하는 이름. 결과에 영향을 주는 값(페이지, 검색어, ID)을 모두 넣기 | 서랍 이름표 |
| **`queryFn`** | 데이터를 실제로 가져오는 함수 (`getMovies` 등) | 도서관 심부름 |
| **`enabled`** | `false`면 자동 요청을 안 함 (검색어 없음, 잘못된 ID) | "아직 심부름 가지 마" |
| **`isPending` / `isLoading`** | `isPending`: 아직 데이터가 없음. `isLoading`: 데이터가 없고 **실제로 요청 중** (`isPending && isFetching`) | 빈 서랍 / 빈 서랍 + 심부름 중 |
| **`staleTime`** | 받아 온 데이터를 최신(fresh)으로 믿는 시간. 기본 0 | 복사본 유효기간 |
| **`gcTime`** | 아무 화면도 안 쓰는(inactive) 캐시를 지우기까지 기다리는 시간. 기본 5분 | 안 쓰는 서랍 비우는 주기 |
| **fresh / stale / inactive** | 유효기간 안 / 지남(다시 받아도 됨) / 지금 쓰는 화면 없음 | 신선 / 유통기한 지남 / 창고 보관 |
| **Query Devtools** | 캐시 목록과 상태를 화면 안에서 보여 주는 개발 도구 | 서랍장 CCTV |

### 5주차 `useEffect`와 비교
| 5주차 (`useEffect`) | 6주차 (`useQuery`) |
|---|---|
| `movies`, `isLoading`, `errorMessage` 상태를 직접 만듦 | `data`, `isPending`/`isLoading`, `isError`를 받아 씀 |
| try/catch/finally, 늦게 온 응답 무시(`ignore`)를 직접 작성 | 라이브러리가 처리 |
| 화면을 다시 열면 항상 다시 요청 | 캐시가 fresh면 요청 없이 바로 표시 |

## 2. 이번 주 실습 → 파일 위치 (`umcine/`)

| 워크북 단원 | 실습 | 파일 |
|---|---|---|
| 2.2 | 패키지 설치, `QueryClientProvider`·Devtools 연결 | [package.json](../../umcine/package.json), [main.tsx](../../umcine/src/main.tsx) |
| 3.1 | 목록을 `useQuery`로 + 페이지 이동 | [movie-list-page.tsx](../../umcine/src/pages/movies/movie-list-page.tsx) |
| 3.2 | 검색을 `useQuery`로 (`enabled`, `isLoading`) | [search-page.tsx](../../umcine/src/pages/movies/search-page.tsx) |
| 3.3 | 상세를 `useQuery`로 (잘못된 ID는 요청 안 함) | [movie-detail-page.tsx](../../umcine/src/pages/movies/movie-detail-page.tsx) |
| 4.3 | 전역 `staleTime` 1분 | [main.tsx](../../umcine/src/main.tsx) |
| 4.3 미니 실습 | 상세만 `staleTime` 30초 | [movie-detail-page.tsx](../../umcine/src/pages/movies/movie-detail-page.tsx) |

### query key 설계
| 화면 | queryKey | 요청 조건 |
|---|---|---|
| 목록 | `["movies", "list", { page }]` | 항상 |
| 검색 | `["movies", "search", { query }]` | 공백 제거한 검색어가 있을 때 |
| 상세 | `["movies", "detail", movieId]` | 0보다 큰 정수일 때 |

```tsx
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } }, // 모든 query 기본값 1분
});

const movieDetailQuery = useQuery({
  queryKey: ["movies", "detail", movieId],
  queryFn: () => getMovieDetail(movieId),
  enabled: isValidMovieId,
  staleTime: 30 * 1000, // 이 query만 30초 (전역 기본값보다 우선)
});
```

## 3. 자주 하는 실수
- 검색어나 페이지를 `queryKey`에 안 넣기 → 검색어를 바꿔도 이전 결과가 그대로 보인다.
- 조건부 요청 화면에서 `isPending`으로 로딩 표시 → `enabled: false`일 때도 계속 "불러오는 중"이 뜬다. `isLoading`을 쓴다.
- 상세에서 잘못된 ID 확인을 로딩 확인보다 뒤에 두기 → 요청을 안 해서 영원히 로딩 화면.
- `staleTime`이 지났는데 Devtools가 계속 fresh로 보인다고 착각 → 다른 창에 갔다 오면 **창 포커스 재조회**로 다시 받아 와서 fresh가 된다.
- `staleTime`이 지나면 캐시가 지워진다고 생각하기 → 지워지는 건 inactive 상태로 `gcTime`이 지난 뒤다.

## 4. 스스로 점검하기
<details><summary>Q1. 목록·검색·상세에 같은 queryKey를 쓰면?</summary>

서로 다른 데이터가 같은 서랍에 들어가 덮어쓴다. 상세를 보다가 목록으로 가면 상세 데이터가 목록 자리에 보이는 식으로 섞인다.
</details>
<details><summary>Q2. <code>enabled: false</code>인데 <code>isPending</code>이 true인 이유와 그때의 <code>isLoading</code>은?</summary>

데이터가 한 번도 안 들어왔으니 `isPending`은 true다. 하지만 요청을 안 하고 있으니 `isFetching`이 false라서 `isLoading`은 false다.
</details>
<details><summary>Q3. <code>staleTime</code>과 <code>gcTime</code>은 언제부터 세나?</summary>

`staleTime`은 데이터를 받아 온 순간부터, `gcTime`은 그 query를 쓰는 화면이 모두 사라져 inactive가 된 순간부터 센다.
</details>
