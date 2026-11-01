(() => {
  // ============================================
  // 10. 중합 실습: 스터디 회원 관리 프로그램
  // ============================================

  // 1. 회원 타입 정의
  type Member = {
    id: number;
    name: string;
    githubId: string;
    role: "leader" | "member";
    level: number;
  };

  // 2. 회원 데이터 저장
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

  // 3. ID로 회원 찾기
  function findMemberById(id: number): Member | undefined {
    return members.find((member) => member.id === id);
  }

  // 4. 회원 정보 출력
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

  // 5. 회원 역할별 메시지
  function getMemberGuide(member: Member): string {
    if (member.role === "leader") {
      return member.name + " 님은 스터디를 이끌어요.";
    }
    return member.name + " 님은 스터디에 참여해요.";
  }

  // 6. 레벨별 메시지
  function getLevelMessage(member: Member): string {
    if (member.level >= 5) {
      return member.name + " 님은 고급 레벨입니다.";
    } else if (member.level >= 1) {
      return member.name + " 님은 기초 레벨입니다.";
    }
    return member.name + " 님은 신입입니다.";
  }

  // ============================================
  // 실행 및 테스트
  // ============================================
  console.log("=== 🔥 10. 중합 실습: 스터디 회원 관리 프로그램 ===\n");

  // 회원 1 조회
  console.log("=== 회원 ID 1 조회 ===");
  const member1 = findMemberById(1);
  if (member1) {
    console.log(printMemberInfo(member1));
    console.log(getMemberGuide(member1));
    console.log(getLevelMessage(member1));
  }

  // 회원 2 조회
  console.log("\n=== 회원 ID 2 조회 ===");
  const member2 = findMemberById(2);
  if (member2) {
    console.log(printMemberInfo(member2));
    console.log(getMemberGuide(member2));
    console.log(getLevelMessage(member2));
  }

  // 회원 999 조회
  console.log("\n=== 회원 ID 999 조회 ===");
  const member999 = findMemberById(999);
  if (member999) {
    console.log(printMemberInfo(member999));
    console.log(getMemberGuide(member999));
    console.log(getLevelMessage(member999));
  }

  // 존재하지 않는 회원 조회
  console.log("\n=== 회원 ID 100 조회 (존재하지 않음) ===");
  const memberNotFound = findMemberById(100);
  if (memberNotFound) {
    console.log(printMemberInfo(memberNotFound));
  } else {
    console.log("회원 ID 100: 조회 불가능 (등록되지 않은 회원)");
  }

  // 전체 회원 목록
  console.log("\n=== 전체 회원 목록 ===");
  members.forEach((member) => {
    console.log(
      "[ID: " +
        member.id +
        "] " +
        member.name +
        " (" +
        member.role +
        ", 레벨 " +
        member.level +
        ")"
    );
  });

  // 회원 역할별 안내
  console.log("\n=== 회원 역할별 안내 ===");
  members.forEach((member) => {
    console.log(getMemberGuide(member));
  });

  // 회원 레벨별 안내
  console.log("\n=== 회원 레벨별 안내 ===");
  members.forEach((member) => {
    console.log(getLevelMessage(member));
  });

  // ============================================
  // TypeScript 타입 시스템 확인
  // ============================================
  console.log("\n=== TypeScript 타입 시스템 확인 ===");
  console.log("✓ Member 타입: id(number), name(string), githubId(string), role('leader'|'member'), level(number)");
  console.log("✓ findMemberById: number → Member | undefined");
  console.log("✓ printMemberInfo: Member → string");
  console.log("✓ getMemberGuide: Member → string");
  console.log("✓ getLevelMessage: Member → string");
  console.log("✓ 모든 함수의 타입이 명확하게 정의되어 있습니다.");
})();
