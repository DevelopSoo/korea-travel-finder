import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBand from "@/components/ui/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { toCardItem } from "@/lib/cards";
import { getPublishedExperiences } from "@/lib/experiences";
import { getPublishedPlaces } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import ExperienceList, { type ListItem } from "./ExperienceList";

export const metadata: Metadata = { title: "Experiences" };

// 알약에 내놓는 취향 — 샘플 데이터에 실제로 있는 것만
const listInterests = ["food", "history", "nature", "local", "sea"] as const;
const durationKeys = ["1-2h", "half-day", "full-day"] as const;

// [4] 경험 목록 — 무엇을 할지 먼저 고르는 사람을 위한 화면
export default async function ExperiencesPage({
  params,
  searchParams,
}: PageProps<"/[lang]/experiences">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { i } = await searchParams;
  const messages = getMessages(lang);
  const t = messages.experiences;

  const items: ListItem[] = getPublishedExperiences().map((experience) => ({
    ...toCardItem(experience, lang, messages),
    interests: experience.interest_tags,
    regionSlug: experience.region,
    duration: experience.duration,
  }));

  // 첫 화면 칩에서 ?i=food 로 넘어온다. 모르는 값이면 전체로 둔다
  const requested = typeof i === "string" ? i : "";
  const initialInterest = listInterests.includes(
    requested as (typeof listInterests)[number],
  )
    ? requested
    : "all";

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.experiences },
        ]}
      />

      <section className="mx-auto max-w-content pt-7 pb-2 text-center gutter">
        <SectionHeading
          as="h1"
          title={t.title}
          eyebrow={<Eyebrow spacing="wide">{t.eyebrow}</Eyebrow>}
          align="center"
        />
        <p className="mx-auto mt-3.5 mb-8 max-w-[52ch] text-ink-soft">
          {t.lead}
        </p>
      </section>

      <section className="mx-auto max-w-content pb-3 gutter">
        <ExperienceList
          items={items}
          initialInterest={initialInterest}
          interests={listInterests.map((key) => ({
            value: key,
            label: messages.results.summary.interest[key],
          }))}
          regions={[
            { value: "all", label: t.filters.allRegions },
            ...getPublishedPlaces().map((place) => ({
              value: place.region,
              label: place.name_en,
            })),
          ]}
          durations={[
            { value: "all", label: t.filters.anyDuration },
            ...durationKeys.map((key) => ({
              value: key,
              label: messages.detail.durationLong[key],
            })),
          ]}
          labels={{
            all: t.filters.all,
            region: t.filters.region,
            time: t.filters.time,
            count: t.count,
            view: messages.common.viewExperience,
            save: messages.common.save,
            empty: messages.places.empty,
          }}
        />
      </section>

      <section className="mx-auto max-w-content pt-12 gutter">
        <CtaBand
          title={t.cta.title}
          body={t.cta.body}
          action={
            <ArrowLink href={`/${lang}/saved`} accent>
              {t.cta.action}
            </ArrowLink>
          }
        />
      </section>
    </>
  );
}
