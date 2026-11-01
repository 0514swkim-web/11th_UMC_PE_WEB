// 미니 실습 3: 원시 타입, 객체 타입과 타입 추론
(() => {
  let studentName: string = "곽수";
  let currentLevel: number = 1;
  let isStudying: boolean = true;

  console.log(studentName, currentLevel, isStudying);

  const member1 = { name: "곽수" };
  const member2 = { name: "지수" };
  const sameMember = member1;

  console.log(member1 === member2);
  console.log(member1 === sameMember);

  const studentNames: string[] = ["곽수", "지수", "현우"];
  const weeklyScores: number[] = [80, 90, 100];

  console.log(studentNames);
  console.log(weeklyScores);

  const assignmentScore: number = 90;
  const courseName = "TypeScript";
  const lessonCount = 8;

  console.log(assignmentScore, courseName, lessonCount);
})();