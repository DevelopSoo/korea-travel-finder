import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import CtaBand from "@/components/ui/CtaBand";
import { Train } from "@/components/ui/icons";
import { toCardItem } from "@/lib/cards";
import { getPublishedExperiences } from "@/lib/experiences";
import { getPlaceOfExperience } from "@/lib/places";
import { getMessages, hasLocale } from "@/messages";
import SavedList, { type SavedItem } from "./SavedList";

// 저장 목록은 이 기기에만 있다 — 검색 결과에 올릴 내용이 없다
export const metadata: Metadata = {
  title: "Saved",
  robots: { index: false },
};

// [6] 저장 — 이 브라우저에 담아 둔 경험
export default async function SavedPage({ params }: PageProps<"/[lang]/saved">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);
  const t = messages.saved;

  const items: SavedItem[] = getPublishedExperiences().map((experience) => {
    const place = getPlaceOfExperience(experience);
    return {
      ...toCardItem(experience, lang, messages),
      regionSlug: experience.region,
      regionName: place?.name_en ?? messages.region[experience.region],
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
        <p className="mt-5.5 flex items-center gap-3 text-small text-ink-2">
          <Train />
          {t.device}
        </p>

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
