import { notFound } from "next/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ChipLink from "@/components/ui/ChipLink";
import Eyebrow from "@/components/ui/Eyebrow";
import PhotoFrame from "@/components/ui/PhotoFrame";
import PlaceCard from "@/components/ui/PlaceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { interestIcons } from "@/components/ui/icons";
import { toPlaceCardItem } from "@/lib/cards";
import { getPublishedPlaces } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";

// 첫 화면에 내놓는 취향 — 샘플 데이터에 실제로 있는 것만 (structure.md §1-4)
const homeInterests = ["food", "history", "nature", "local"] as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.home;
  const places = getPublishedPlaces().map((place) =>
    toPlaceCardItem(place, lang),
  );

  return (
    <>
      {/* 첫 화면 사진 — 화면 끝까지 닿는다. 글자는 사진 위 왼쪽 아래 */}
      <section className="relative">
        <PhotoFrame
          src={null}
          caption={t.hero.caption}
          seed="home-hero"
          tone="pine"
          ratio="fill"
          rounded="none"
          captionSide="right"
          sizes="100vw"
          preload
          className="min-h-[420px] md:min-h-[440px]"
        >
          <div className="mx-auto flex h-full max-w-content flex-col justify-center pt-16 pb-24 text-on-photo gutter">
            <h1 className="max-w-[12ch] text-4xl md:text-hero">
              {t.hero.headline}
            </h1>
            <p className="mt-5 max-w-[340px] text-lg text-on-photo/90">
              {t.hero.sub}
            </p>
            <div className="mt-7">
              {/* 사진 위에서는 강조 그린 대신 종이색 버튼을 쓴다 (patterns.md 8번) */}
              <ButtonPrimary href={`/${lang}/places`} tone="paper" arrow>
                {t.hero.cta}
              </ButtonPrimary>
            </div>
          </div>
        </PhotoFrame>
      </section>

      {/* 취향 칩 — 누르면 그 취향으로 거른 경험 목록으로 간다 */}
      <section className="mx-auto max-w-content pt-16 pb-6 text-center gutter">
        <SectionHeading title={t.interests.title} align="center" />
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {homeInterests.map((key) => {
            const Icon = interestIcons[key];
            return (
              <ChipLink
                key={key}
                href={`/${lang}/experiences?i=${key}`}
                label={messages.interest[key]}
                icon={Icon ? <Icon /> : undefined}
              />
            );
          })}
        </div>
      </section>

      {/* 장소 */}
      <section id="places" className="mx-auto max-w-content pt-12 pb-6 gutter">
        <SectionHeading
          title={t.places.title}
          action={
            <ArrowLink href={`/${lang}/places`}>{t.places.action}</ArrowLink>
          }
        />
        <div className="mt-6 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <PlaceCard key={place.slug} item={place} />
          ))}
        </div>
      </section>

      {/* 시즌 밴드 — 사진 반, 글 반 */}
      <section className="mt-14 grid bg-paper-2 md:grid-cols-2">
        <PhotoFrame
          src={null}
          caption={t.season.caption}
          seed="home-season"
          tone="dusk"
          ratio="fill"
          rounded="none"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="min-h-[260px] md:min-h-[380px]"
        />
        <div className="flex flex-col justify-center px-5 py-14 md:px-13">
          <Eyebrow spacing="wide">{t.season.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-display">{t.season.title}</h2>
          <p className="mt-4.5 text-ink-2">{t.season.body}</p>
          <div className="mt-6.5">
            <ArrowLink href={`/${lang}/experiences`}>
              {t.season.action}
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
