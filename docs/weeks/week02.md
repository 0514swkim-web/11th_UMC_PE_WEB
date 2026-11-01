# 2주차 FE: React 컴포넌트와 상태 기반 UI

> 한 줄 요약: **React는 "상태가 바뀌면 화면을 다시 그리는" 도구.** 화면을 컴포넌트로 쪼개고, props로 값을 내려 주고, state로 변화를 기억한다.

## 1. 핵심 개념

| 개념 | 쉬운 설명 | 비유 |
|---|---|---|
| **Vite** | React 프로젝트를 만들고 개발 서버를 띄워 주는 도구 | 공장 설비 세트 |
| **JSX / TSX** | JS(TS) 안에서 HTML처럼 화면을 쓰는 문법. `class` 대신 `className` | HTML 모양의 주문서 |
| **컴포넌트** | 화면 조각을 만드는 함수. 이름은 대문자로 시작 | 레고 블록 |
| **props** | 부모가 자식 컴포넌트에 넘기는 값. 자식은 읽기만 한다 | 택배 상자 안의 물건 |
| **목록 렌더링** | 배열을 `map`으로 컴포넌트 목록으로 바꿈. 각 항목에 고유 `key` 필요 | 명찰 붙인 줄 세우기 |
| **조건부 렌더링** | `조건 && <A/>`, `조건 ? <A/> : <B/>` | 날씨 보고 우산 챙기기 |
| **이벤트** | `onClick={함수}`처럼 사용자 행동에 반응 | 초인종 |
| **state (`useState`)** | 컴포넌트가 기억하는 값. setter로 바꾸면 화면이 다시 그려짐 | 화이트보드 |
| **불변성** | 배열·객체 state는 직접 수정하지 말고 **새 배열**을 만들어 교체 (`map`, `filter`, `...`) | 원본 서류는 두고 사본 제출 |
| **상태 끌어올리기** | 여러 컴포넌트가 같이 쓰는 state는 공통 부모가 가진다 | 가족 공용 달력 |
| **Context API** | props를 여러 단계 거치지 않고 트리 깊은 곳에 값 전달 | 건물 전체 방송 |

## 2. 이번 주 실습 → 폴더 위치

| 워크북 단원 | 실습 | 폴더 |
|---|---|---|
| 1 | React 프로젝트 생성, 개발 서버 | [1.react_practice](../../week02-react-practice/1.react_practice) |
| 2 | JSX·TSX | [2.jsx_tsx](../../week02-react-practice/2.jsx_tsx) |
| 3 | 컴포넌트 나누기 | [3.component](../../week02-react-practice/3.component) |
| 4 | props | [4.props](../../week02-react-practice/4.props) |
| 5 | 목록·조건부 렌더링 | [5.list_conditional](../../week02-react-practice/5.list_conditional) |
| 6 | 이벤트와 useState | [6.state_event](../../week02-react-practice/6.state_event) |
| 7 | 배열 상태 업데이트 (북마크) | [7.movie_bookmark](../../week02-react-practice/7.movie_bookmark) |
| 8 | Context API | [8.context_api](../../week02-react-practice/8.context_api) |
| 미션 | UMCine 영화 목록 화면 | [umcine/](../../umcine) |

### 필수 미션 키워드 → 구현
| 키워드 | 구현 |
|---|---|
| 에셋·더미 데이터 | `umcine/public/images`, `public/icons`, `src/types/movie.ts`, `src/data/movies.ts` |
| 컴포넌트 분리 | `src/components/` (Header, MovieGrid, MovieCard, Pagination) |
| props로 영화 전달 | `MovieGrid` → `MovieCard`에 `movie` 전달 |
| 목록 렌더링 | `movies.map(...)` + `key={movie.id}` |
| 북마크 상태 | `App.tsx`의 `useState<Movie[]>` + `map`으로 `isBookmarked` 토글 |

```bash
cd umcine
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # 타입 검사 + 빌드
```

## 3. 자주 하는 실수
- `movies[0].isBookmarked = true`처럼 state를 직접 바꾸기 → 화면이 안 바뀐다. 새 배열로 `setMovies`.
- `map`에서 `key` 빠뜨리기 → Console 경고, 목록 갱신이 꼬일 수 있다.
- `onClick={handle()}` → 렌더링 때 바로 실행된다. `onClick={handle}` 또는 `onClick={() => handle(id)}`.
- 쓰지 않는 import → `pnpm build`(tsc)에서 오류. (이번에 실제로 겪고 `useState<Movie[]>`로 해결)

## 4. 스스로 점검하기
<details><summary>Q1. props와 state의 차이는?</summary>

props는 부모가 주는 값(자식은 읽기만), state는 컴포넌트가 직접 기억하고 바꾸는 값.
</details>
<details><summary>Q2. 북마크 토글을 불변성 지켜 쓰면?</summary>

`setMovies(prev => prev.map(m => m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m))`
</details>
<details><summary>Q3. Context는 언제 쓰나?</summary>

여러 단계 아래 컴포넌트들이 같은 값(테마, 모드, 로그인 정보)을 써야 할 때. 단순한 부모→자식 전달은 props로 충분하다.
</details>
