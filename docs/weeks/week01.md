# 1주차 FE: TypeScript 핵심 문법과 타입 시스템

> 한 줄 요약: **TypeScript는 실행 전에 "값의 모양"을 검사해 주는 JavaScript.** 타입은 실행 결과를 바꾸지 않고, 실수를 미리 잡아 준다.

## 1. 핵심 개념

| 개념 | 쉬운 설명 | 비유 |
|---|---|---|
| **TypeScript** | JavaScript에 타입 문법을 더한 언어. `tsc`가 검사한 뒤 JS로 바꿔 준다 | 맞춤법 검사기가 붙은 워드 |
| **컴파일 (`tsc`)** | `.ts` → `.js` 변환 + 타입 검사. `--noEmit`은 검사만 하고 파일은 안 만든다 | 원고 교정만 받기 vs 인쇄까지 하기 |
| **원시 타입** | `string`, `number`, `boolean`, `null`, `undefined` | 물건의 재질 표시 |
| **타입 추론** | 값을 보고 TS가 타입을 알아서 정함. `const n = 1` → `number` | 얼굴만 봐도 누군지 아는 것 |
| **객체 타입 / `interface`** | 객체가 어떤 프로퍼티를 가져야 하는지 정한 설계도 | 회원가입 양식 |
| **선택 프로퍼티 `?`** | 있어도 되고 없어도 되는 값. 타입은 `string \| undefined`가 된다 | 양식의 "선택 입력" 칸 |
| **유니언 `A \| B`** | 여러 타입 중 하나 | "현금 또는 카드" |
| **타입 좁히기** | `if`, `typeof`, `!value`로 검사해서 남은 타입만 쓰기 | 신분증 확인 후 입장 |
| **`??` (nullish 병합)** | 왼쪽이 `null`/`undefined`일 때만 오른쪽 값 사용 | 빈칸이면 기본값 채우기 |
| **`any` vs `unknown`** | `any`는 검사 포기, `unknown`은 검사해야 쓸 수 있음 | 무사통과 vs 보안 검색대 |
| **제네릭 `<T>`** | 타입을 매개변수처럼 받아 입력과 출력 타입을 연결 | 어떤 물건이든 담는 투명 상자 |
| **strict 모드** | 느슨한 검사를 끄고 엄격하게 검사 (`null` 가능성 등) | 깐깐한 검사관 |

## 2. 이번 주 실습 → 파일 위치

| 워크북 단원 | 실습 | 파일 |
|---|---|---|
| 1 | 실습 환경 준비 (`strict: true`) | [tsconfig.json](../../week01-typescript/tsconfig.json) |
| 4 | 함수 매개변수·반환 타입 | [01-function-type.ts](../../week01-typescript/src/mini-practices/01-function-type.ts) |
| 3 | 원시 타입, 타입 추론 | [02](../../week01-typescript/src/mini-practices/02-primitive-types.ts), [03](../../week01-typescript/src/mini-practices/03-original-types-and-inference.ts) |
| 4 | 객체 타입과 interface | [04-object-types.ts](../../week01-typescript/src/mini-practices/04-object-types.ts) |
| 5 | 유니언과 타입 좁히기 | [05-union-types.ts](../../week01-typescript/src/mini-practices/05-union-types.ts) |
| 6 | null / undefined | [06-null-undefined.ts](../../week01-typescript/src/mini-practices/06-null-undefined.ts) |
| 7 | any 대신 unknown | [07-any-unknown.ts](../../week01-typescript/src/mini-practices/07-any-unknown.ts) |
| 8 | 제네릭 | [08-generics.ts](../../week01-typescript/src/mini-practices/08-generics.ts) |
| 9 | strict 모드와 오류 읽기 | [09-strict-mode.ts](../../week01-typescript/src/mini-practices/09-strict-mode.ts) |
| 미션 | 스터디 회원 관리 프로그램 | [10-final-mission.ts](../../week01-typescript/src/mini-practices/10-final-mission.ts) |

### 필수 미션 키워드 → 구현
| 키워드 | 구현 |
|---|---|
| GitHub 아이디는 선택 값 | `githubId?: string` |
| 서로 다른 회원 두 명 이상 | GitHub 있는 `욱`, 없는 `지수` |
| 없는 회원도 오류 없이 | `findMemberById` → `undefined`면 `if (!member)`로 먼저 처리 |
| GitHub 없는 회원 처리 | `member.githubId ?? "등록되지 않음"` |
| ID 1, 2, 999 결과 확인 | `[1, 2, 999].forEach(...)` |

```bash
cd week01-typescript
pnpm exec tsc --noEmit                         # 타입 검사만
pnpm exec tsc                                   # dist/ 로 컴파일
node dist/mini-practices/10-final-mission.js    # 실행
```

## 3. 자주 하는 실수
- `githubId: string`으로 두고 회원 객체에서 빼먹기 → "프로퍼티가 없다" 오류. 선택 값은 `?`를 붙인다.
- `||`와 `??` 혼동: `0 || 1`은 `1`, `0 ?? 1`은 `0`. 0이나 빈 문자열도 정상 값이면 `??`를 쓴다.
- `find` 결과를 바로 `member.name`으로 쓰기 → `undefined`일 수 있어서 strict 모드에서 오류.
- `any`로 오류를 덮기 → 검사가 사라질 뿐 버그는 그대로다.

## 4. 스스로 점검하기
<details><summary>Q1. <code>githubId?: string</code>의 실제 타입은?</summary>

`string | undefined`. 그래서 쓰기 전에 `??`나 `if`로 처리해야 한다.
</details>
<details><summary>Q2. <code>unknown</code> 값을 문자열 메서드로 쓰려면?</summary>

`typeof value === "string"`으로 좁힌 블록 안에서만 쓸 수 있다.
</details>
<details><summary>Q3. <code>tsc --noEmit</code>은 왜 쓰나?</summary>

결과 파일 없이 타입 오류만 빠르게 확인하려고. 빌드 전 점검용이다.
</details>
