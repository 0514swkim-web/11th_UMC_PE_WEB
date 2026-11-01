(() => {
  // ============================================
  // 9-1: 반환 타입 명시하기 (string)
  // ============================================
  function createLevelMessage(currentLevel: number): string {
    if (currentLevel > 0) {
      return "현재 " + currentLevel + "레벨이에요.";
    }
    return "레벨을 확인해주세요.";
  }

  console.log("=== 9-1: 반환 타입 명시 (string) ===");
  console.log(createLevelMessage(5)); // "현재 5레벨이에요."
  console.log(createLevelMessage(0)); // "레벨을 확인해주세요."

  // ============================================
  // 9-2: 오류 메시지를 읽는 연습
  // ============================================
  console.log("\n=== 9-2: 오류 메시지 분석 ===");
  
  // 아래 코드는 컴파일 오류가 발생합니다.
  // Type 'number' is not assignable to type 'string'
  
  // ❌ 오류 예시 (주석 처리):
  // const wrongMessage: string = 42;
  // → 42는 number인데 string 타입에 할당할 수 없음
  
  console.log("✓ Type 'A' is not assignable to type 'B'");
  console.log("  = A 타입을 B 타입에 할당할 수 없다는 뜻");

  // ============================================
  // 9-3: 함수에서 모든 분기에서 값 반환하기
  // ============================================
  function getStudentStatus(name: string, isActive: boolean): string {
    if (isActive) {
      return name + " 님은 활동 중입니다.";
    }
    // 모든 분기에서 반환해야 함
    return name + " 님은 활동하지 않습니다.";
  }

  console.log("\n=== 9-3: 모든 분기에서 반환 ===");
  console.log(getStudentStatus("곽수", true)); // "곽수 님은 활동 중입니다."
  console.log(getStudentStatus("김철수", false)); // "김철수 님은 활동하지 않습니다."

  // ============================================
  // 9-4: strict 모드 오류 감지
  // ============================================
  console.log("\n=== 9-4: strict 모드의 장점 ===");
  console.log("✓ 더 엄격한 타입 검사");
  console.log("✓ null/undefined 안전성");
  console.log("✓ 암묵적인 any 금지");
  console.log("✓ 더 안전한 코드 작성");

  // ============================================
  // 9-5: tsconfig.json 설정 의미
  // ============================================
  console.log("\n=== 9-5: tsconfig.json 핵심 설정 ===");
  console.log('"strict": true  → 모든 타입 검사 규칙 활성화');
  console.log('"noEmit": true  → JavaScript 파일 생성 안 함 (타입만 검사)');
  console.log('"target": "ES2022"  → 컴파일 대상 JavaScript 버전');

  // ============================================
  // 미니 실습: 반환 타입을 명시하고 오류 해결하기
  // ============================================
  console.log("\n=== 미니 실습: 반환 타입 명시 ===");

  // 1. 반환 타입이 명시된 함수들
  function getWelcomeMessage(name: string): string {
    return "환영합니다, " + name + "님!";
  }

  function calculateLevel(score: number): number {
    return Math.floor(score / 10);
  }

  function isHighScore(score: number): boolean {
    return score >= 80;
  }

  console.log("1) string 반환:");
  console.log(getWelcomeMessage("곽수"));

  console.log("\n2) number 반환:");
  console.log("점수 95 → 레벨", calculateLevel(95));

  console.log("\n3) boolean 반환:");
  console.log("점수 95 → 고득점?", isHighScore(95));

  // 2. 반환 타입 오류 연습
  console.log("\n=== 반환 타입 오류 분석 ===");
  console.log("❌ function getName(): number { return '곽수'; }");
  console.log("   → Type 'string' is not assignable to type 'number'");
  console.log("   → 해결: 반환 타입을 string으로 수정");

  // 3. 모든 경로에서 반환하기
  function getMemberRole(level: number): string {
    if (level >= 5) {
      return "리더";
    } else if (level >= 1) {
      return "멤버";
    }
    return "신입";
  }

  console.log("\n=== 모든 경로에서 반환 ===");
  console.log("레벨 7 →", getMemberRole(7)); // "리더"
  console.log("레벨 3 →", getMemberRole(3)); // "멤버"
  console.log("레벨 0 →", getMemberRole(0)); // "신입"

  // ============================================
  // 미니 실습: 오류 두 개 해결하기
  // ============================================
  console.log("\n=== 미니 실습: 오류 두 개 해결하기 ===");

  type WeeklyGoal = {
    title: string;
    targetCount: number;
  };

  // ✅ 수정 1: targetCount를 number로 변경
  const weeklyGoal: WeeklyGoal = {
    title: "TypeScript 예제 인증",
    targetCount: 3,  // "3" → 3
  };

  // ✅ 수정 2: 반환 타입을 void로 변경
  function printGoal(goal: WeeklyGoal): void {
    console.log(goal.title);
  }

  printGoal(weeklyGoal); // "TypeScript 예제 인증"

  // ✅ 또는 string을 반환하는 버전
  function getGoalMessage(goal: WeeklyGoal): string {
    return goal.title + " - 목표: " + goal.targetCount + "회";
  }

  console.log("\n=== 반환 타입이 있는 버전 ===");
  console.log(getGoalMessage(weeklyGoal)); // "TypeScript 예제 인증 - 목표: 3회"

  // ✅ 타입 확인
  console.log("\n=== 타입 확인 ===");
  console.log("weeklyGoal.title 타입: string → ", typeof weeklyGoal.title);
  console.log("weeklyGoal.targetCount 타입: number → ", typeof weeklyGoal.targetCount);

  // ============================================
  // strict 모드 덕분에
  // ============================================
  console.log("\n=== strict 모드 덕분에 ===");
  console.log("✓ 타입 불일치를 컴파일 타임에 감지");
  console.log("✓ null/undefined 체크 강제");
  console.log("✓ 더 안전한 코드 작성 가능");
})();