// 미니 실습 7: any 대신 unknown 사용하기
(() => {
  // ===== 7-2: unknown 사용 (안전) =====

  function printNicknameUnknown(nickname: unknown) {
    if (typeof nickname === "string") {
      console.log(nickname.toUpperCase());
    } else {
      console.log("닉네임은 문자열이어야 해요.");
    }
  }

  printNicknameUnknown("gwangsoo");  // ✅ 작동
  printNicknameUnknown(123);         // ✅ 안전

  // ===== 7-3: unknown 관의 타입 구분 =====

  function formatStudyWeek(data: unknown) {
    if (typeof data === "number") {
      return "현재 " + data + "주차입니다.";
    }
    if (typeof data === "string") {
      return "입력한 주차: " + data;
    }
    return "주차 정보를 찾을 수 없습니다.";
  }

  console.log(formatStudyWeek(1));
  console.log(formatStudyWeek("1주차"));
  console.log(formatStudyWeek(null));

  // ===== 미니 실습 (최종): unknown 값 구분하기 =====

  type FormatStudyWeek = (data: unknown) => string;

  const formatStudyWeekFn: FormatStudyWeek = (data: unknown) => {
    if (typeof data === "number") {
      return "현재 " + data + "주차입니다.";
    }
    if (typeof data === "string") {
      return "입력한 주차: " + data;
    }
    return "주차 정보를 찾을 수 없습니다.";
  };

  console.log(formatStudyWeekFn(1));
  console.log(formatStudyWeekFn("1주차"));
  console.log(formatStudyWeekFn(null));
})();