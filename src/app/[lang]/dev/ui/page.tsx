import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toCardItem, toPlaceCardItem } from "@/lib/cards";
import { getPublishedExperiences } from "@/lib/experiences";
import { getPublishedPlaces } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import Gallery from "./Gallery";

// 검색에 걸리지 않게 — 개발 중에만 여는 화면
export const metadata: Metadata = {
  title: "UI",
  robots: { index: false, follow: false },
};

// 부품 모음. 개발 전용 — `next build`/`next start` 는 NODE_ENV 가 production 이라 404 가 된다
export default async function UiPage({ params }: PageProps<"/[lang]/dev/ui">) {
  if (process.env.NODE_ENV === "production") notFound();

  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);

  return (
    <Gallery
      lang={lang}
      messages={messages}
      cards={getPublishedExperiences().map((experience) =>
        toCardItem(experience, lang, messages),
      )}
      places={getPublishedPlaces().map((place) => toPlaceCardItem(place, lang))}
    />
  );
}
