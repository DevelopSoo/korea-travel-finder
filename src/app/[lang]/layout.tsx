import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getMessages, hasLocale, locales } from "@/messages";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // en 외의 언어 주소(/ko 등)는 404.
  // dynamicParams = false 는 쓰지 않는다 — 아래 [...rest] 까지 막혀 /en/1 에서 머리·발이 사라진다.
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);

  return (
    <>
      <Header lang={lang} messages={messages} />
      {/* 폭은 화면마다 다르다 — 첫 화면 사진 구역은 화면 끝까지 닿는다 */}
      <main className="flex-1">{children}</main>
      <Footer lang={lang} messages={messages} />
    </>
  );
}
