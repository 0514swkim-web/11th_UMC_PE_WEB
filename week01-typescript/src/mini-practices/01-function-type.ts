function introduceStudent(studentName: string, currentLevel: number) {
  return studentName + " 님은 현재 " + currentLevel + "레벨이에요."
}

console.log(introduceStudent("곽수", 1));

// 미니 실습 : 컴파일 오류와 타입 오류 구분하기

//[오류1] 타입 오류 : "1" (string) -> number 파라미터
// error TS2345 : Argument of type 'string' is not assignable to parameter of type 'number'.

// 수정 전: introduceStudent("곽수", "1");  // 오류
// 수정 후: introduceStudent("곽수", 1);   // 성공