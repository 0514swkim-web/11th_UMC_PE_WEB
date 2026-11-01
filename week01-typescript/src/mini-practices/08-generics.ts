(() => {
  // ============================================
  // 8-1: keepValue<T> 함수 - 입력과 같은 타입 반환
  // ============================================
  function keepValue<T>(value: T): T {
    return value;
  }

  const studentName = keepValue<string>("곽수");
  const currentLevel = keepValue<number>(1);
  const isCompleted = keepValue<boolean>(false);

  console.log("=== 8-1: keepValue<T> ===");
  console.log(`studentName: ${studentName}`); // "곽수"
  console.log(`currentLevel: ${currentLevel}`); // 1
  console.log(`isCompleted: ${isCompleted}`); // false

  // ============================================
  // 8-2: createBox<T> 함수 - 기본 구현
  // ============================================
  function createBox<T>(value: T) {
    return { value };
  }

  const nameBox = createBox<string>("곽수");
  const scoreBox = createBox<number>(100);

  console.log("\n=== 8-2: createBox<T> ===");
  console.log(`nameBox.value: ${nameBox.value}`); // "곽수"
  console.log(`scoreBox.value: ${scoreBox.value}`); // 100

  // ============================================
  // 8-3: 제약 조건 - T extends NamedMember
  // ============================================
  type NamedMember = {
    name: string;
  };

  function getMemberName<T extends NamedMember>(member: T): string {
    return member.name;
  }

  const member1 = { name: "곽수", level: 1 };
  const member2 = { name: "김철수", level: 2, role: "leader" };

  console.log("\n=== 8-3: Generic Constraints (T extends NamedMember) ===");
  console.log(`member1 name: ${getMemberName(member1)}`); // "곽수"
  console.log(`member2 name: ${getMemberName(member2)}`); // "김철수"

  // ============================================
  // 미니 실습: createBox<T> 사용하기
  // ============================================
  console.log("\n=== 미니 실습: createBox<T> 사용하기 ===");

  // 1. 값을 받아(value) 객체로 반환하는 createBox<T> 함수를 만들어요.
  // → 이미 위에서 정의됨

  // 2. 문자열, 숫자, 회원 객체를 각각 전달돼요.
  const stringBox = createBox("곽수");
  const numberBox = createBox(100);
  const memberBoxResult = createBox({ name: "곽수", level: 1 });

  console.log("1) 문자열 테스트:");
  console.log(`stringBox.value: ${stringBox.value}`); // "곽수" (타입: string)

  console.log("\n2) 숫자 테스트:");
  console.log(`numberBox.value: ${numberBox.value}`); // 100 (타입: number)

  console.log("\n3) 회원 객체 테스트:");
  console.log(`memberBoxResult.value:`, memberBoxResult.value); // { name: "곽수", level: 1 }

  // 3. 각 결과의 value에 마우스를 올려 추론된 타입을 기록해요.
  console.log("\n=== 타입 추론 확인 ===");
  console.log(`stringBox.value 타입: string`);
  console.log(`numberBox.value 타입: number`);
  console.log(`memberBoxResult.value 타입: { name: string; level: number }`);

  // 4. 함수 반환 타입이 직접 지정돼도 입력 타입이 정확해요 확인해요.
  console.log("\n=== 4) 타입 안전성 검증 ===");
  console.log("✓ createBox는 입력 타입을 정확하게 반환합니다.");
  console.log("✓ 문자열 입력 → 문자열 반환");
  console.log("✓ 숫자 입력 → 숫자 반환");
  console.log("✓ 객체 입력 → 같은 구조의 객체 반환");
})();