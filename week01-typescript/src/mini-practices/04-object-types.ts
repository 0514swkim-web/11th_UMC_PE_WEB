// 미니 실습 4: 객체와 함수에 타입 붙이기
(() => {
  // 1단계: 객체의 타입 정의
  type Student = {
    name: string;
    level: number;
    isCompleted: boolean;
  };

  // 2단계: 객체 만들기 (타입에 맞게)
  const student: Student = {
    name: "곽수",
    level: 1,
    isCompleted: false
  };

  console.log(student);
  console.log(student.name);
  console.log(student.level);

  // 3단계: 함수에 타입 붙이기
  function createGreeting(studentName: string): string {
    return "안녕하세요, " + studentName + " 님!";
  }

  const message = createGreeting("곽수");
  console.log(message);

  // 4단계: 함수에 객체 전달하기
  function printStudentInfo(student: Student): void {
    console.log(student.name + " 님은 현재 " + student.level + "레벨입니다.");
  }

  printStudentInfo(student);

  // 5단계: 함수가 객체를 반환하기
  function calculateTotalScore(assignmentScore: number, attendanceScore: number): number {
    return assignmentScore + attendanceScore;
  }

  const totalScore = calculateTotalScore(90, 85);
  console.log("총점: " + totalScore);

  // ===== 미니 실습 4-2: 함수의 매개변수와 반환 타입 추론 =====

  function createGreeting2(studentName: string) {
    return "안녕하세요, " + studentName + " 님!";
  }

  const greetingMessage = createGreeting2("곽수");
  console.log(greetingMessage);

  function printGreeting(studentName: string) {
    console.log("반갑거든요, " + studentName + " 님!");
  }

  printGreeting("곽수");

  // ===== 미니 실습 4-3: 확실한 함수의 반환 타입도 추론할 수 있어요 =====

  const calculateTotalScore2 = (
    assignmentScore: number,
    attendanceScore: number
  ) => {
    return assignmentScore + attendanceScore;
  };

  const total = calculateTotalScore2(90, 85);
  console.log("합계 점수: " + total);

  // ===== 미니 실습 4-4: 오류를 고쳐 회원 카드 만들기 =====

  type StudyMember = {
    name: string;
    level: number;
    isLeader: boolean;
  };

  const member: StudyMember = {
    name: "곽수",
    level: 1,
    isLeader: true
  };

  function createMemberCard(studyMember: StudyMember) {
    return studyMember.name + " 님, " + studyMember.level + "레벨!";
  }

  console.log(createMemberCard(member));
})();

// ===== 미니 실습 4-4: 4번 항목용 =====

type StudyMember = {
  name: string;
  level: number;
  isLeader: boolean;
};

const member: StudyMember = {
  name: "곽수",
  level: 1,
  isLeader: true
};

function createMemberCard(studyMember: StudyMember) {
  return studyMember.name + " 님, " + studyMember.level + "레벨!";
}

console.log(createMemberCard(member));