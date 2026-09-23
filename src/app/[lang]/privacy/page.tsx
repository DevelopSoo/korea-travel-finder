import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getMessages, hasLocale } from "@/messages";

export const metadata: Metadata = { title: "Privacy" };

// [7] 개인정보 안내 — 글만. 계정 없이는 브라우저에만, 계정을 만들면 계정에 남는다는 게 요점이다
export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.privacy;

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: t.title },
        ]}
      />
      <article className="mx-auto max-w-[68ch] pt-6 gutter">
        <h1 className="text-title">{t.title}</h1>
        <div className="mt-5 flex flex-col gap-4 text-ink-2">
          {t.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {t.contact}:{" "}
            <a
              href={`mailto:${t.email}`}
              className="font-semibold text-accent-press border-b-[1.5px] border-current break-all"
            >
              {t.email}
            </a>
          </p>
        </div>
      </article>
    </>
  );
}
