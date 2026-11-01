(() => {
  // ============================================
  // 10. 종합 실습: 스터디 회원 관리 프로그램
  // ============================================

  // 1. 회원 타입 정의 (GitHub 아이디는 선택 값)
  interface StudyMember {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
  }

  // 2. 서로 다른 정보를 가진 회원 두 명
  const members: StudyMember[] = [
    { id: 1, name: "욱", role: "leader", githubId: "0514swkim-web" },
    { id: 2, name: "지수", role: "member" }, // GitHub 아이디 없음
  ];

  // 3. ID로 회원 찾기 (없으면 undefined)
  function findMemberById(id: number): StudyMember | undefined {
    return members.find((member) => member.id === id);
  }

  // 4. 역할별 안내 문구
  function getRoleText(role: StudyMember["role"]): string {
    return role === "leader" ? "스터디를 이끌어요" : "스터디에 참여해요";
  }

  // 5. 회원 ID로 안내 문구 만들기
  function getMemberGuideMessage(id: number): string {
    const member = findMemberById(id);

    // 존재하지 않는 회원: 타입 좁히기로 먼저 처리
    if (!member) {
      return `[ID ${id}] 등록되지 않은 회원입니다.`;
    }

    // GitHub 아이디가 없는 회원: ?? 로 기본값 사용
    const githubText = member.githubId ?? "등록되지 않음";
    return `[ID ${member.id}] ${member.name}님은 ${getRoleText(member.role)}. (GitHub: ${githubText})`;
  }

  // ============================================
  // 실행: 회원 ID 1, 2, 999
  // ============================================
  console.log("=== 스터디 회원 관리 프로그램 ===");
  [1, 2, 999].forEach((id) => {
    console.log(getMemberGuideMessage(id));
  });
})();
