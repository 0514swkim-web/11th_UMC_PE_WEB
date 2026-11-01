# 1주차 캡처 체크리스트

이 폴더에 아래 파일 이름 그대로 저장해 주세요.

| 파일 이름 | 무엇을 찍나 | 명령 (터미널, `week01-typescript` 폴더에서) |
|---|---|---|
| `01-tsc-noemit.png` | 타입 검사가 아무 오류 없이 끝난 터미널 | `pnpm install` 후 `pnpm exec tsc --noEmit` |
| `02-mission-run.png` | 회원 ID 1, 2, 999 실행 결과 3줄 | `pnpm exec tsc` → `node dist/mini-practices/10-final-mission.js` |
| `03-mission-code.png` | (선택) `githubId?: string`과 `??` 부분 코드 | VS Code에서 `10-final-mission.ts` |

> 캡처 후 생긴 `dist/` 폴더는 `.gitignore`에 있어서 올라가지 않아요.
