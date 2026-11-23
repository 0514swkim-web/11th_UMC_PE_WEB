import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Footer } from "../components/layout/footer";
import { Header } from "../components/layout/header";
import { Providers } from "./providers";
import "./globals.css";

// next/font: 빌드할 때 폰트를 내려받아 우리 서버에서 같이 제공 (외부 폰트 서버 요청 없음, 워크북 5.3)
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

// 모든 페이지에 공통으로 들어가는 페이지 정보 (워크북 5.4)
// title.template: 각 page.tsx의 title이 %s 자리에 들어감 → "영화 검색 | UMCine"
export const metadata: Metadata = {
  title: {
    default: "UMCine",
    template: "%s | UMCine",
  },
  description: "TMDB 인기 영화를 둘러보고 평점과 즐겨찾기를 남기는 UMCine",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UMCine",
    description: "TMDB 인기 영화를 둘러보고 평점과 즐겨찾기를 남겨 보세요.",
    siteName: "UMCine",
    locale: "ko_KR",
    type: "website",
  },
};

// Vite의 index.html + __root.tsx 역할 (Server Component)
// <Outlet /> 자리가 {children}
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body>
        {/* QueryClientProvider 같은 Context는 Client Component라 따로 분리 */}
        <Providers>
          <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
