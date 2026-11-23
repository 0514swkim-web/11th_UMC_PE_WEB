import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // create-next-app 기본 설정 그대로 (워크북 2.4: 요청 뒤에 알 수 있는 값은 Suspense 안에서 읽기)
  cacheComponents: true,
  partialPrefetching: true,
  // Vite의 @tailwindcss/vite 플러그인 대신 Turbopack용 Tailwind 로더
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // next/image로 TMDB 포스터를 불러오려면 이미지 서버를 허용 목록에 넣어야 함 (워크북 5.1)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org", pathname: "/t/p/**" },
    ],
  },
};

export default nextConfig;
