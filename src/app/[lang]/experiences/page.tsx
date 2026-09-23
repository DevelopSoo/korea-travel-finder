import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaBand from "@/components/ui/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import { toCardItem } from "@/lib/cards";
import { getPublishedExperiences } from "@/lib/experiences";
import { getPublishedPlaces, getRegionNames } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import ExperienceList, { type ListItem } from "./ExperienceList";

export const metadata: Metadata = { title: "Experiences" };

// 알약에 내놓는 취향 — 샘플 데이터에 실제로 있는 것만
const listInterests = ["food", "history", "nature", "local", "sea"] as const;
const durationKeys = ["1-2h", "half-day", "full-day"] as const;

type ListProps = Omit<ComponentProps<typeof ExperienceList>, "initialInterest">;

// 첫 화면 칩에서 ?i=food 로 넘어온다. 주소 뒤 값은 요청 때만 알 수 있어서
// 이 부분만 요청 때 그리고, 나머지 화면은 미리 만들어 둔다. 모르는 값이면 전체로 둔다
async function ListWithInterest({
  searchParams,
  ...props
}: ListProps & Pick<PageProps<"/[lang]/experiences">, "searchParams">) {
  const { i } = await searchParams;
  const requested = typeof i === "string" ? i : "";
  const initialInterest = listInterests.includes(
    requested as (typeof listInterests)[number],
  )
    ? requested
    : "all";
  return <ExperienceList {...props} initialInterest={initialInterest} />;
}

// [4] 경험 목록 — 무엇을 할지 먼저 고르는 사람을 위한 화면
export default async function ExperiencesPage({
  params,
  searchParams,
}: PageProps<"/[lang]/experiences">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.experiences;

  const [experiences, places, regionNames] = await Promise.all([
    getPublishedExperiences(),
    getPublishedPlaces(),
    getRegionNames(),
  ]);
  const items: ListItem[] = experiences.map((experience) => ({
    ...toCardItem(experience, lang, messages, regionNames[experience.region] ?? ""),
    interests: experience.interest_tags,
    regionSlug: experience.region,
    duration: experience.duration,
  }));

  const listProps: ListProps = {
    items,
    interests: listInterests.map((key) => ({
      value: key,
      label: messages.results.summary.interest[key],
    })),
    regions: [
      { value: "all", label: t.filters.allRegions },
      ...places.map((place) => ({
        value: place.region,
        label: place.name_en,
      })),
    ],
    durations: [
      { value: "all", label: t.filters.anyDuration },
      ...durationKeys.map((key) => ({
        value: key,
        label: messages.detail.durationLong[key],
      })),
    ],
    labels: {
      all: t.filters.all,
      region: t.filters.region,
      time: t.filters.time,
      count: t.count,
      view: messages.common.viewExperience,
      save: messages.common.save,
      empty: messages.places.empty,
    },
  };

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
        {/* 기다리는 동안에는 전체 목록을 먼저 보여 준다 */}
        <Suspense fallback={<ExperienceList {...listProps} initialInterest="all" />}>
          <ListWithInterest {...listProps} searchParams={searchParams} />
        </Suspense>
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
