// 미니 실습 5: 유니언 타입과 타입 좁히기
(() => {
  // ===== 미니 실습 5-1: 기본 유니언 타입 =====
  
  function printMemberId(memberId: string | number) {
    console.log(memberId);
  }

  printMemberId("member-01");
  printMemberId(1);

  // ===== 미니 실습 5-2: typeof로 타입 좁히기 =====

  function formatMemberId(memberId: string | number) {
    if (typeof memberId === "string") {
      return memberId.toUpperCase();
    }
    return "MEMBER-" + memberId;
  }

  console.log(formatMemberId("member-01"));
  console.log(formatMemberId(1));

  // ===== 미니 실습 5-3: 리터럴 타입으로 선택지 정하기 =====

  type MemberRole = "leader" | "member";
  type AttendanceStatus = "present" | "late" | "absent";

  const gwangsooRole: MemberRole = "leader";
  const todayStatus: AttendanceStatus = "present";

  console.log("역할: " + gwangsooRole);
  console.log("상태: " + todayStatus);

  // ===== 미니 실습 5-4: 판별 유니언 =====

  type StudyResult = 
    | { status: "success"; completedCount: number }
    | { status: "error"; message: string };

  function printStudyResult(result: StudyResult) {
    if (result.status === "success") {
      console.log("완료한 과제: " + result.completedCount);
      return;
    }
    console.log("오류: " + result.message);
  }

  const successResult: StudyResult = { status: "success", completedCount: 5 };
  const errorResult: StudyResult = { status: "error", message: "네트워크 오류" };

  printStudyResult(successResult);
  printStudyResult(errorResult);

  // ===== 미니 실습 5 (최종): 회원 역할에 따라 문구 바꾸기 =====

  function getMemberGuide(role: MemberRole): string {
    if (role === "leader") {
      return "스터디를 이끌어요.";
    }
    return "스터디에 참여해요.";
  }

  console.log(getMemberGuide("leader"));
  console.log(getMemberGuide("member"));
})();