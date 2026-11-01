(() => {
  // ============================================
  // UMC 1주차 TypeScript 워크북 통합 코드
  // ============================================

  console.log("========================================");
  console.log("   UMC 1주차 TypeScript 워크북 완료");
  console.log("========================================\n");

  // ============================================
  // 1. 기본 타입과 타입 추론
  // ============================================
  console.log("=== 1. 기본 타입과 타입 추론 ===");
  const studentName: string = "곽수";
  const currentLevel: number = 1;
  const isCompleted: boolean = false;
  console.log(
    `학생명: ${studentName}, 레벨: ${currentLevel}, 완료: ${isCompleted}`
  );

  // ============================================
  // 2. 객체 타입과 함수
  // ============================================
  console.log("\n=== 2. 객체 타입과 함수 ===");
  type Student = {
    name: string;
    level: number;
  };

  const student: Student = { name: "곽수", level: 1 };

  function createStudentCard(student: Student): string {
    return student.name + " 님, " + student.level + "레벨!";
  }

  console.log(createStudentCard(student));

  // ============================================
  // 3. 유니언 타입과 타입 좁히기
  // ============================================
  console.log("\n=== 3. 유니언 타입과 타입 좁히기 ===");
  type MemberRole = "leader" | "member";

  function getMemberGuide(role: MemberRole): string {
    if (role === "leader") {
      return "스터디를 이끌어요.";
    }
    return "스터디에 참여해요.";
  }

  console.log("leader: " + getMemberGuide("leader"));
  console.log("member: " + getMemberGuide("member"));

  // ============================================
  // 4. Null/Undefined 안전하게 다루기
  // ============================================
  console.log("\n=== 4. Null/Undefined 안전하게 다루기 ===");
  type StudyMember = {
    name: string;
    githubId?: string;
  };

  const member: StudyMember = { name: "곽수", githubId: "0514swim-web" };
  const memberNoGithub: StudyMember = { name: "김철수" };

  console.log("곽수의 GitHub: " + (member.githubId ?? "등록되지 않음"));
  console.log("김철수의 GitHub: " + (memberNoGithub.githubId ?? "등록되지 않음"));

  // ============================================
  // 5. Unknown 타입 사용하기
  // ============================================
  console.log("\n=== 5. Unknown 타입 사용하기 ===");
  function printNicknameUnknown(nickname: unknown): void {
    if (typeof nickname === "string") {
      console.log("닉네임: " + nickname.toUpperCase());
    } else {
      console.log("닉네임은 문자열이어야 해요.");
    }
  }

  printNicknameUnknown("욱");
  printNicknameUnknown(123);

  // ============================================
  // 6. 제네릭 (Generic)
  // ============================================
  console.log("\n=== 6. 제네릭 (Generic) ===");
  function keepValue<T>(value: T): T {
    return value;
  }

  function createBox<T>(value: T) {
    return { value };
  }

  console.log("String: " + keepValue<string>("곽수"));
  console.log("Number: " + keepValue<number>(1));
  console.log("Box: ", createBox(100));

  // ============================================
  // 7. 제네릭 제약 조건 (Generic Constraints)
  // ============================================
  console.log("\n=== 7. 제네릭 제약 조건 ===");
  type NamedMember = {
    name: string;
  };

  function getMemberName<T extends NamedMember>(member: T): string {
    return member.name;
  }

  const namedMember = { name: "곽수", level: 5 };
  console.log("회원 이름: " + getMemberName(namedMember));

  // ============================================
  // 8. 반환 타입 명시 (Strict Mode)
  // ============================================
  console.log("\n=== 8. 반환 타입 명시 (Strict Mode) ===");
  function createLevelMessage(currentLevel: number): string {
    if (currentLevel > 0) {
      return "현재 " + currentLevel + "레벨이에요.";
    }
    return "레벨을 확인해주세요.";
  }

  console.log(createLevelMessage(5));
  console.log(createLevelMessage(0));

  // ============================================
  // 9. 최종 미션: 스터디 회원 관리 프로그램
  // ============================================
  console.log("\n=== 9. 최종 미션: 스터디 회원 관리 프로그램 ===\n");

  type Member = {
    id: number;
    name: string;
    githubId: string;
    role: "leader" | "member";
    level: number;
  };

  const members: Member[] = [
    {
      id: 1,
      name: "곽수",
      githubId: "0514swim-web",
      role: "leader",
      level: 5,
    },
    {
      id: 2,
      name: "김철수",
      githubId: "kim-cs",
      role: "member",
      level: 3,
    },
    {
      id: 999,
      name: "관리자",
      githubId: "admin-user",
      role: "leader",
      level: 10,
    },
  ];

  function findMemberById(id: number): Member | undefined {
    return members.find((member) => member.id === id);
  }

  function printMemberInfo(member: Member): string {
    return (
      "ID: " +
      member.id +
      ", 이름: " +
      member.name +
      ", GitHub: " +
      member.githubId +
      ", 역할: " +
      member.role +
      ", 레벨: " +
      member.level
    );
  }

  function getMemberRoleGuide(member: Member): string {
    if (member.role === "leader") {
      return member.name + " 님은 스터디를 이끌어요.";
    }
    return member.name + " 님은 스터디에 참여해요.";
  }

  function getMemberLevelMessage(member: Member): string {
    if (member.level >= 5) {
      return member.name + " 님은 고급 레벨입니다.";
    } else if (member.level >= 1) {
      return member.name + " 님은 기초 레벨입니다.";
    }
    return member.name + " 님은 신입입니다.";
  }

  // 회원 조회
  console.log("=== 전체 회원 목록 ===");
  members.forEach((member) => {
    console.log(printMemberInfo(member));
    console.log(getMemberRoleGuide(member));
    console.log(getMemberLevelMessage(member));
    console.log("");
  });

  // ============================================
  // 마무리
  // ============================================
  console.log("========================================");
  console.log("     UMC 1주차 TypeScript 완료! 🎉");
  console.log("========================================");
  console.log("\n학습한 내용:");
  console.log("✓ 기본 타입 (string, number, boolean)");
  console.log("✓ 객체 타입 (type, interface)");
  console.log("✓ 유니언 타입 (|)");
  console.log("✓ null/undefined 처리");
  console.log("✓ unknown 타입");
  console.log("✓ 제네릭 (<T>)");
  console.log("✓ 제네릭 제약 조건 (extends)");
  console.log("✓ 반환 타입 명시");
  console.log("✓ Strict Mode");
  console.log("✓ 실무 프로그램 구현\n");
})();