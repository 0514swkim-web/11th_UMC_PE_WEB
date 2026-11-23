// 브라우저에서도 쓰는 값만 여기에 둠
// Next.js는 NEXT_PUBLIC_으로 시작하는 값만 브라우저 코드에 넣어 줌 (Vite의 VITE_와 같은 역할)
// process.env.이름을 "그대로" 적어야 빌드할 때 값으로 바뀜
const umcApiBaseUrl = process.env.NEXT_PUBLIC_UMC_API_BASE_URL;

if (!umcApiBaseUrl) {
  throw new Error("UMC 백엔드 환경 변수(NEXT_PUBLIC_UMC_API_BASE_URL)가 필요해요.");
}

export const env = {
  umcApiBaseUrl,
};
