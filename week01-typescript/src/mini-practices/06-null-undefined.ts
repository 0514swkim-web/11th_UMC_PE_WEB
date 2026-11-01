// 미니 실습 6: null과 undefined를 안전하게 다루기
(() => {
  // ===== 6-1: 기본 null과 undefined =====
  
  type StudyMember = {
    name: string;
    githubId?: string;
  };

  const members: StudyMember[] = [
    { name: "곽수", githubId: "gwangsoo" },
    { name: "지수" }
  ];

  let selectedMember: StudyMember | null = null;
  const foundMember = members.find((member) => member.name === "현우");

  console.log(selectedMember);
  console.log(foundMember);

  // ===== 6-2: 조건문으로 값 있는지 확인 =====

  if (foundMember) {
    console.log(foundMember.name);
  } else {
    console.log("회원을 찾지 못했어요.");
  }

  // ===== 6-3: 옵셔널 체이닝(?.) =====

  const githubId = foundMember?.githubId;
  console.log(githubId);

  // ===== 6-4: nullish coalescing(??) =====

  const studyHour: number | undefined = undefined;
  console.log(studyHour || 1);
  console.log(studyHour ?? 1);

  const nickname: string | null = "";
  console.log(nickname || "닉네임 없음");
  console.log(nickname ?? "닉네임 없음");

  // ===== 6-5: non-null assertion (!) =====

  const displayGithubId = foundMember?.githubId ?? "등록되지 않음";
  console.log(displayGithubId);

  // ===== 미니 실습 (최종): 값이 없는 경우와 기본값 비교하기 =====

  // 1. 회원 배열에서 없는 이름을 찾아 undefined가 나오는지 확인
  const notFoundMember = members.find((member) => member.name === "현우");
  console.log("찾은 회원: " + notFoundMember);  // undefined

  // 2. StudyMember | null 변수에 null을 넣고 의도적으로 비어 있는 상태 표현
  const emptySelectedMember: StudyMember | null = null;
  console.log("선택된 회원: " + emptySelectedMember);  // null

  // 3. 조건문을 사용해 회원이 있을 때만 이름을 출력
  if (notFoundMember) {
    console.log("회원 이름: " + notFoundMember.name);
  } else {
    console.log("회원을 찾지 못했어요.");
  }

  // 4. 학습 시간이 0일 때 || 와 ?? 의 결과 비교
  const hours: number | undefined = undefined;
  console.log("|| 결과: " + (hours || 1));
  console.log("?? 결과: " + (hours ?? 1));

  // 5. ?. 와 ?? 를 사용해 GitHub 아이디가 없을 때 "등록되지 않음" 출력
  const displayId = notFoundMember?.githubId ?? "등록되지 않음";
  console.log("GitHub 아이디: " + displayId);
})();