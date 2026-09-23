import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import CtaBand from "@/components/ui/CtaBand";
import DaySteps from "@/components/ui/DaySteps";
import EmptyState from "@/components/ui/EmptyState";
import Eyebrow from "@/components/ui/Eyebrow";
import ExperienceCard from "@/components/ui/ExperienceCard";
import FactGrid from "@/components/ui/FactGrid";
import PhotoFrame from "@/components/ui/PhotoFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, Compass, Train } from "@/components/ui/icons";
import { toCardItem } from "@/lib/cards";
import {
  getPlace,
  getPlaceExperiences,
  getPublishedPlaces,
} from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";

export async function generateStaticParams() {
  const places = await getPublishedPlaces();
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/places/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) return {};
  return { title: place.name_en, description: place.tagline_en };
}

// "Plan your visit" 아이콘은 순서가 고정이다 — 데이터에는 글자만 둔다
const planIcons = [<Train key="0" />, <Calendar key="1" />, <Compass key="2" />];

// [3] 장소 안내 — 그 지역이 어떤 곳인지, 거기서 무엇을 할 수 있는지
export default async function PlacePage({
  params,
}: PageProps<"/[lang]/places/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const place = await getPlace(slug);
  if (!place) notFound();

  const messages = getMessages(lang);
  const t = messages.places;
  const experiences = (await getPlaceExperiences(place)).map((experience) =>
    toCardItem(experience, lang, messages, place.name_en),
  );
  const cardLabels = {
    view: messages.common.viewExperience,
    save: messages.common.save,
  };

  const facts = place.plan.map((item, i) => ({
    icon: planIcons[i] ?? <Compass />,
    title: item.title_en,
    desc: item.desc_en,
  }));

  return (
    <>
      <Breadcrumb
        variant="banded"
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.places, href: `/${lang}/places` },
          { label: place.name_en },
        ]}
      />

      {/* 첫 사진 — 이름과 한 줄이 사진 위 왼쪽 아래에 앉는다 */}
      <PhotoFrame
        src={place.hero_image_url}
        caption={place.hero_caption}
        credit={place.hero_image_credit}
        creditLabel={messages.photo.credit}
        seed={place.slug}
        tone="sea"
        ratio="fill"
        rounded="none"
        captionSide="right"
        sizes="100vw"
        preload
        className="min-h-[340px] md:min-h-[400px]"
      >
        <div className="mx-auto flex h-full max-w-content flex-col justify-end pt-20 pb-16 text-on-photo gutter">
          <Eyebrow spacing="wide" tone="on-photo">
            {place.area_en}
          </Eyebrow>
          <h1 className="mt-3.5 text-5xl md:text-[66px] md:leading-none">
            {place.name_en}
          </h1>
          <p className="mt-4 font-display text-card text-on-photo/95">
            {place.tagline_en}
          </p>
        </div>
      </PhotoFrame>

      {/* 소개: 왼쪽 제목·버튼, 오른쪽 설명 글 */}
      <section className="mx-auto grid max-w-content gap-12 pt-14 pb-10 gutter md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-display">{place.headline_en}</h2>
          <p className="mt-3.5 font-display text-lead text-ink-2">
            {place.lead_en}
          </p>
          <div className="mt-6.5">
            <ButtonPrimary href="#experiences" arrow>
              {t.exploreAction}
            </ButtonPrimary>
          </div>
        </div>
        <p className="text-ink-2 md:mt-1.5">{place.description_en}</p>
      </section>

      {/* 가는 법·시기·이동 */}
      <section className="mx-auto max-w-content gutter">
        <div className="rounded-xl bg-paper-3 px-6 pt-7 pb-8 md:px-9">
          <h2 className="mb-5 text-section">{t.plan}</h2>
          <FactGrid facts={facts} variant="plain" minWidth="220px" />
        </div>
      </section>

      {/* 그 지역 경험 */}
      <section id="experiences" className="mx-auto max-w-content pt-14 pb-3 gutter">
        <SectionHeading
          title={t.experiences.title.replace("{place}", place.name_en)}
          lead={t.experiences.lead}
        />
        {experiences.length === 0 ? (
          <EmptyState title={t.empty} />
        ) : (
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((item) => (
              <ExperienceCard key={item.slug} item={item} labels={cardLabels} />
            ))}
          </div>
        )}
      </section>

      {/* 하루 흐름 */}
      <section className="mx-auto max-w-content pt-11 gutter">
        <div className="grid gap-11 rounded-xl bg-paper-2 p-7 md:grid-cols-2">
          <PhotoFrame
            src={place.card_image_url}
            caption={place.card_caption}
            credit={place.card_image_credit}
            creditLabel={messages.photo.credit}
            seed={`${place.slug}-day`}
            ratio="fill"
            rounded="md"
            sizes="(min-width: 768px) 45vw, 100vw"
            className="min-h-[220px] md:min-h-[320px]"
          />
          <div className="flex flex-col justify-center px-2 py-4">
            <Eyebrow spacing="wide">{t.day.eyebrow}</Eyebrow>
            <h2 className="mt-3 mb-5.5 text-title">{t.day.title}</h2>
            <DaySteps
              steps={place.day.map((step) => ({
                title: step.title_en,
                desc: step.desc_en,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content pt-9 gutter">
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
