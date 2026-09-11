import { notFound } from "next/navigation";
import { getMessages, hasLocale } from "@/messages";
import Questions from "./Questions";

// [2] 질문 화면 — 답은 화면 안에서만 들고 있다가 마지막 답에서 결과 주소로 넘긴다
export default async function FindPage({ params }: PageProps<"/[lang]/find">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getMessages(lang);

  return <Questions lang={lang} t={t.find} backLabel={t.common.back} />;
}
