import { notFound } from "next/navigation";
import { getMessages, hasLocale } from "@/messages";

// [5] 개인정보 안내 — 글만. 문단은 임시 (PRD 미결 4번 결정 후 교체)
export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getMessages(lang).privacy;

  return (
    <article className="flex flex-col gap-md py-lg">
      <h1 className="font-display text-title font-semibold text-ink">
        {t.title}
      </h1>
      {t.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-body text-ink">
          {paragraph}
        </p>
      ))}
    </article>
  );
}
