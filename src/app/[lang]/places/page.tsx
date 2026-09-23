import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Eyebrow from "@/components/ui/Eyebrow";
import PlaceCard from "@/components/ui/PlaceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { toPlaceCardItem } from "@/lib/cards";
import { getPublishedPlaces } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";

export const metadata: Metadata = { title: "Places" };

// [2] 장소 목록 — 어디로 갈지 먼저 고르는 사람을 위한 화면
export default async function PlacesPage({ params }: PageProps<"/[lang]/places">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.places;
  const places = (await getPublishedPlaces()).map((place) =>
    toPlaceCardItem(place, lang),
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.places },
        ]}
      />
      <div className="mx-auto max-w-content pt-6 pb-4 gutter">
        <SectionHeading
          as="h1"
          title={t.title}
          lead={t.lead}
          eyebrow={<Eyebrow spacing="wide">{t.eyebrow}</Eyebrow>}
        />
        <div className="mt-9 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.slug} item={place} />
          ))}
        </div>
      </div>
    </>
  );
}
