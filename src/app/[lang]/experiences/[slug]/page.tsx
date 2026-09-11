import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import ExperienceCardSmall from "@/components/ui/ExperienceCardSmall";
import InfoTable from "@/components/ui/InfoTable";
import Photo from "@/components/ui/Photo";
import RegionBadge from "@/components/ui/RegionBadge";
import Stars from "@/components/ui/Stars";
import Tags from "@/components/ui/Tags";
import {
  getExperience,
  getPublishedExperiences,
  getRelatedExperiences,
} from "@/lib/experiences";
import { getMessages, hasLocale } from "@/messages";

// 배포할 때 미리 만들어 둔다 (PRD §4 [4]). 목록에 없는 slug 는 아래에서 404
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

  return {
    title: experience.name_en,
    description: experience.tagline_en,
  };
}

const subheading = "font-display text-card font-semibold text-ink";

// [4] 경험 상세 — 구글에서 바로 오는 사람도 있어 맨 아래 Find your Korea 가 꼭 있다
export default async function ExperiencePage({
  params,
}: PageProps<"/[lang]/experiences/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const experience = getExperience(slug);
  if (!experience) notFound();

  const messages = getMessages(lang);
  const t = messages.detail;
  const stars = messages.experience.stars;
  const related = getRelatedExperiences(experience);
  const tags = [
    ...new Set([...experience.interest_tags, ...experience.style_tags]),
  ];

  const rows = [
    { label: t.info.time, value: t.durationLong[experience.duration] },
    {
      label: t.info.price,
      value: messages.experience.price[experience.price_level],
    },
    { label: t.info.best, value: experience.best_time },
    {
      label: t.info.english,
      value: (
        <Stars
          value={experience.english_ease}
          label={stars.english}
          ariaLabel={`${stars.englishName} ${stars.outOf.replace(
            "{value}",
            String(experience.english_ease),
          )}`}
        />
      ),
    },
    {
      label: t.info.local,
      value: (
        <Stars
          value={experience.localness}
          label={stars.local}
          ariaLabel={`${stars.localName} ${stars.outOf.replace(
            "{value}",
            String(experience.localness),
          )}`}
        />
      ),
    },
    {
      label: t.info.booking,
      value: experience.booking_required
        ? t.booking.required
        : t.booking.notNeeded,
    },
  ];

  return (
    <article className="pt-md pb-xl">
      <Photo
        src={experience.image_urls[0] ?? null}
        caption={experience.image_captions[0]}
        ratio="4:5"
        preload
      />

      <header className="mt-lg flex flex-col gap-xs">
        <RegionBadge region={experience.region} />
        <h1 className="font-display text-title font-semibold text-ink">
          {experience.name_en}
        </h1>
      </header>

      <div className="mt-md flex flex-col gap-md text-body text-ink">
        {experience.description_en.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-xl flex flex-col gap-sm">
        <h2 className={subheading}>{messages.experience.whyNotSeoul}</h2>
        <p className="text-body text-ink">{experience.why_not_seoul_en}</p>
      </section>

      <section className="mt-xl">
        <InfoTable rows={rows} />
      </section>

      {/* 나중에 제휴 링크(투어, 기차표)를 붙일 자리는 이 구역 아래 (PRD §4 [4]) */}
      <section className="mt-xl flex flex-col items-start gap-sm">
        <h2 className={subheading}>{t.howToGetThere}</h2>
        <p className="text-body text-ink">{experience.how_to_get_there_en}</p>
        <ButtonSecondary href={experience.map_url} external>
          {t.openMaps}
        </ButtonSecondary>
      </section>

      <div className="mt-xl flex flex-col items-start gap-md">
        <Tags label={messages.experience.goodFor} tags={tags} />
        {experience.shorts_url && (
          <ButtonSecondary href={experience.shorts_url} external>
            {t.watchShorts}
          </ButtonSecondary>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-xl flex flex-col gap-md">
          <h2 className={subheading}>{t.alsoLike}</h2>
          <ul className="grid grid-cols-3 gap-sm">
            {related.map((item) => (
              <li key={item.slug}>
                <ExperienceCardSmall
                  experience={item}
                  href={`/${lang}/experiences/${item.slug}`}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 페이지 맨 아래 버튼 위 64px (tokens.md §2-3) */}
      <div className="mt-2xl">
        <ButtonPrimary href={`/${lang}/find`}>{t.cta}</ButtonPrimary>
      </div>
    </article>
  );
}
