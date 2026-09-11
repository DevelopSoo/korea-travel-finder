import { notFound } from "next/navigation";
import EmptyState from "@/components/ui/EmptyState";
import ExperienceCard from "@/components/ui/ExperienceCard";
import TextLink from "@/components/ui/TextLink";
import { getPublishedExperiences, MAX_RESULTS } from "@/lib/experiences";
import { parseAnswers } from "@/lib/questions";
import { getMessages, hasLocale } from "@/messages";
import ResultsEmail from "./ResultsEmail";

// [3] 결과 화면 — 답은 주소(?i=…&v=…&s=…)에 있어 새로고침해도 그대로다
export default async function ResultsPage({
  params,
  searchParams,
}: PageProps<"/[lang]/results">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = getMessages(lang);
  const answers = parseAnswers(await searchParams);
  // 추천 규칙은 다음 계획 — 지금은 공개된 샘플을 앞에서부터 최대 8개
  const cards = getPublishedExperiences().slice(0, MAX_RESULTS);

  if (cards.length === 0) {
    const empty = t.empty.noResults;
    return (
      <EmptyState
        title={empty.title}
        body={empty.body}
        action={{ label: empty.action, href: `/${lang}` }}
      />
    );
  }

  // 요약은 질문 1·3 답만 (structure.md §1-3 [3] `Nature · Local · Slow`)
  const summary = [
    ...answers.interests.map((tag) => t.results.summary.interest[tag]),
    ...(answers.style ? [t.results.summary.style[answers.style]] : []),
  ].join(" · ");

  return (
    <div className="flex flex-col gap-xl py-lg">
      <header className="flex flex-col gap-xs">
        <h1 className="font-display text-title font-semibold text-ink">
          {t.results.title}
        </h1>
        {summary && <p className="text-small text-ink-soft">{summary}</p>}
      </header>

      <ul className="flex flex-col gap-lg">
        {cards.map((experience) => (
          <li key={experience.slug}>
            <ExperienceCard
              experience={experience}
              href={`/${lang}/experiences/${experience.slug}`}
              messages={t}
            />
          </li>
        ))}
      </ul>

      <ResultsEmail messages={t} />

      <p className="text-center text-body">
        <TextLink href={`/${lang}`}>{t.results.startOver}</TextLink>
      </p>
    </div>
  );
}
