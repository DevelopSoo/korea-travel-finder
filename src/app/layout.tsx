import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

// 제목 — Source Serif 4 (tokens.md §2-2)
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// 본문·버튼 — Source Sans 3
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Experience Korea",
  // 공유 이미지처럼 전체 주소가 필요한 값의 앞부분. 도메인을 바꾸면 여기만 고친다.
  // Vercel 미리보기 배포에서는 Next 가 이 값 대신 미리보기 주소를 쓴다
  metadataBase: new URL("https://korea-travel-finder.vercel.app"),
  // 탭·검색 결과 아이콘. 기본 favicon.ico 는 지웠다
  icons: { icon: "/logo.svg" },
  // 링크 공유 미리보기. SVG 는 메신저·SNS 가 못 읽어 PNG 를 쓴다
  openGraph: {
    images: [{ url: "/og-image.png", width: 1024, height: 1024 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
