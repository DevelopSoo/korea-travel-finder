import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import CtaBand from "@/components/ui/CtaBand";
import { toCardItem } from "@/lib/cards";
import { getPublishedExperiences } from "@/lib/experiences";
import { getPublishedPlaces } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import SavedList, { type SavedItem } from "./SavedList";
import SavedNote from "./SavedNote";

// 저장 목록은 사람마다 다르다(이 기기 또는 계정) — 검색 결과에 올릴 내용이 없다
export const metadata: Metadata = {
  title: "Saved",
  robots: { index: false },
};

// [6] 저장 — 이 브라우저 또는 계정에 담아 둔 경험
export default async function SavedPage({ params }: PageProps<"/[lang]/saved">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.saved;

  const [experiences, places] = await Promise.all([
    getPublishedExperiences(),
    getPublishedPlaces(),
  ]);
  const items: SavedItem[] = experiences.map((experience) => {
    const place = places.find((p) => p.region === experience.region);
    const regionName = place?.name_en ?? "";
    return {
      ...toCardItem(experience, lang, messages, regionName),
      regionSlug: experience.region,
      regionName,
      placeHref: place ? `/${lang}/places/${place.slug}` : null,
    };
  });

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.saved },
        ]}
      />

      <div className="mx-auto max-w-content pt-6 gutter">
        <h1 className="max-w-[16ch] text-display md:text-[58px]">{t.title}</h1>
        <p className="mt-3 font-display text-card text-ink-soft">{t.lead}</p>
        <SavedNote lang={lang} labels={t.device} />

        <SavedList
          items={items}
          labels={{
            all: messages.experiences.filters.all,
            heading: t.heading,
            countLabel: t.countLabel,
            regionGuide: t.regionGuide,
            empty: t.empty,
            view: messages.common.viewExperience,
            save: messages.common.save,
            remove: messages.common.remove,
          }}
        />

        <div className="pt-12">
          <CtaBand
            title={t.cta.title}
            body={t.cta.body}
            action={
              <ButtonPrimary href={`/${lang}/experiences`} pill arrow>
                {t.cta.action}
              </ButtonPrimary>
            }
          />
        </div>
      </div>
    </>
  );
}
