import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import CtaBand from "@/components/ui/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import ExperienceCardWide from "@/components/ui/ExperienceCardWide";
import FactGrid from "@/components/ui/FactGrid";
import PhotoFrame from "@/components/ui/PhotoFrame";
import SaveButton from "@/components/ui/SaveButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { Clock, Coins, Note, Sun, Ticket } from "@/components/ui/icons";
import { toCardItem } from "@/lib/cards";
import {
  getExperience,
  getPublishedExperiences,
  getRelatedExperiences,
} from "@/lib/experiences";
import { getPlaceOfExperience } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import type { Score } from "@/lib/types";

export function generateStaticParams() {
  return getPublishedExperiences().map((experience) => ({
    slug: experience.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/experiences/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};
  return { title: experience.name_en, description: experience.tagline_en };
}

// 별 다섯 개 대신 문장 하나로 적는다 (patterns.md 14번)
function englishLabel(score: Score, t: { easy: string; some: string; little: string }) {
  if (score >= 4) return t.easy;
  if (score >= 3) return t.some;
  return t.little;
}

// [5] 경험 상세 — 구글에서 바로 들어오는 사람도 있어 지역 안내로 가는 길이 꼭 있다
export default async function ExperiencePage({
  params,
}: PageProps<"/[lang]/experiences/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const experience = getExperience(slug);
  if (!experience) notFound();

  const messages = getMessages(lang);
  const t = messages.detail;
  const place = getPlaceOfExperience(experience);
  const placeName = place?.name_en ?? messages.region[experience.region];
  const related = getRelatedExperiences(experience).map((item) =>
    toCardItem(item, lang, messages),
  );
  const tags = [
    ...new Set([...experience.interest_tags, ...experience.style_tags]),
  ];

  const facts = [
    {
      icon: <Clock />,
      title: t.info.time,
      desc: t.durationLong[experience.duration],
    },
    {
      icon: <Coins />,
      title: t.info.price,
      desc: t.price[experience.price_level],
    },
    {
      icon: <Sun />,
      title: t.info.best,
      desc: experience.best_time,
    },
    {
      icon: <Ticket />,
      title: t.info.booking,
      desc: experience.booking_required
        ? t.booking.required
        : t.booking.notNeeded,
    },
  ];

  const saveButton = (
    <SaveButton
      slug={experience.slug}
      saveLabel={messages.common.save}
      savedLabel={messages.common.saved}
    />
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.experiences, href: `/${lang}/experiences` },
          ...(place
            ? [{ label: place.name_en, href: `/${lang}/places/${place.slug}` }]
            : []),
          { label: experience.name_en },
        ]}
      />

      <article className="mx-auto max-w-content pt-5 gutter">
        <Eyebrow tone="accent" className="tracking-[0.16em]">
          {placeName} · {messages.results.summary.interest[
            experience.interest_tags[0] as keyof typeof messages.results.summary.interest
          ] ?? ""}
        </Eyebrow>
        <h1 className="mt-3.5 text-display md:text-[56px]">
          {experience.name_en}
        </h1>
        <p className="mt-3 font-display text-lead text-ink-2">
          {experience.tagline_en}
        </p>

        <div className="mt-7 mb-7 flex flex-wrap items-center gap-5">
          {saveButton}
        </div>

        <PhotoFrame
          src={experience.image_urls[0] ?? null}
          caption={experience.image_captions[0]}
          seed={experience.slug}
          ratio="fill"
          rounded="md"
          captionSide="right"
          sizes="(min-width: 1200px) 1112px, 100vw"
          preload
          className="min-h-[260px] md:min-h-[400px]"
        />

        <div className="mt-0">
          <FactGrid facts={facts} />
        </div>

        {/* 본문 두 단: 왼쪽 글과 사진, 오른쪽 요약 상자 */}
        <div className="grid gap-11 pt-13 md:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-title">{t.about}</h2>
            <div className="mt-3.5 flex flex-col gap-4 text-ink-2">
              {experience.description_en.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-8.5 text-section">{t.whyNotSeoul}</h3>
            <p className="mt-3 text-ink-2">{experience.why_not_seoul_en}</p>

            <h3 className="mt-8.5 text-section">{t.howToGetThere}</h3>
            <p className="mt-3 text-ink-2">{experience.how_to_get_there_en}</p>
            <div className="mt-5 flex flex-wrap gap-3.5">
              <ButtonSecondary href={experience.map_url} external>
                {t.openMaps}
              </ButtonSecondary>
              {experience.shorts_url && (
                <ButtonSecondary href={experience.shorts_url} external>
                  {t.watchShorts}
                </ButtonSecondary>
              )}
            </div>

            {experience.image_urls.length > 1 && (
              <div className="mt-8.5 grid grid-cols-2 gap-4.5">
                {experience.image_urls.slice(1, 3).map((src, i) => (
                  <PhotoFrame
                    key={src}
                    src={src}
                    caption={experience.image_captions[i + 1] ?? experience.image_captions[0]}
                    seed={`${experience.slug}-${i}`}
                    ratio="3:2"
                    sizes="(min-width: 768px) 30vw, 50vw"
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-xl bg-accent-soft px-7 py-7.5">
            <h3 className="text-section">{t.goodFor}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag.replace("_", " ")}</Tag>
              ))}
            </div>
            <p className="mt-3.5 text-small text-ink-2">{t.goodForBody}</p>

            <hr className="my-5.5 border-t border-line" />

            <h3 className="text-card">{t.beforeYouGo}</h3>
            <dl className="mt-4 flex flex-col gap-3.5 text-meta text-ink-2">
              <div className="flex gap-3">
                <dt className="sr-only">{t.info.english}</dt>
                <dd>{englishLabel(experience.english_ease, t.english)}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{t.info.best}</dt>
                <dd>{experience.best_time}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{t.info.booking}</dt>
                <dd>
                  {experience.booking_required
                    ? t.booking.required
                    : t.booking.notNeeded}
                </dd>
              </div>
            </dl>

            {place && (
              <div className="mt-6.5">
                <ButtonSecondary
                  href={`/${lang}/places/${place.slug}`}
                  full
                  arrow
                >
                  {t.placeGuide.replace("{place}", place.name_en)}
                </ButtonSecondary>
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="pt-14">
            <SectionHeading
              title={t.nearby.title.replace("{place}", placeName)}
              lead={t.nearby.lead}
            />
            <div className="mt-6.5 grid gap-6.5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ExperienceCardWide
                  key={item.slug}
                  item={item}
                  labels={{
                    view: messages.common.viewExperience,
                    save: messages.common.save,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* 자료가 바뀔 수 있다는 안내 — 우리가 예약을 받지 않는다는 뜻이기도 하다 */}
        <p className="mt-9 flex items-center gap-2.5 border-t border-line pt-4.5 text-meta text-ink-2">
          <Note />
          <span>
            <strong className="font-semibold">{t.note.label}</strong>{" "}
            {t.note.body}
          </span>
        </p>

        <div className="pt-11">
          <CtaBand
            title={t.cta.title}
            action={
              <div className="flex flex-wrap items-center gap-5">
                {saveButton}
                <ArrowLink href={`/${lang}/saved`}>{t.cta.action}</ArrowLink>
              </div>
            }
          />
        </div>
      </article>
    </>
  );
}
