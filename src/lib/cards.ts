import type { Messages } from "@/messages";
import type { Experience, Place } from "./types";

// 카드가 실제로 그리는 값만 모은 모양.
// 화면 부품은 Experience 전체를 알 필요가 없다 — 부품 모음 화면에서도 그대로 쓴다.
export type CardItem = {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  // 사진 캡션 = alt (photos.md §3-1)
  caption: string;
  src: string | null;
  // 카드 위 눈썹 글자
  category: string;
  region: string;
};

// 카드 눈썹 글자는 첫 번째 취향 표를 쓴다. 표가 없으면 지역만 적는다
function categoryOf(experience: Experience, messages: Messages): string {
  const first = experience.interest_tags[0];
  const labels = messages.results.summary.interest;
  return (first && labels[first as keyof typeof labels]) ?? "";
}

// regionName 은 places.name_en — 부르는 쪽에서 getRegionNames() 로 찾아 넘긴다
export function toCardItem(
  experience: Experience,
  lang: string,
  messages: Messages,
  regionName: string,
): CardItem {
  return {
    slug: experience.slug,
    href: `/${lang}/experiences/${experience.slug}`,
    title: experience.name_en,
    blurb: experience.tagline_en,
    caption: experience.image_captions[0],
    src: experience.image_urls[0] ?? null,
    category: categoryOf(experience, messages),
    region: regionName,
  };
}

export function toPlaceCardItem(place: Place, lang: string): CardItem {
  return {
    slug: place.slug,
    href: `/${lang}/places/${place.slug}`,
    title: place.name_en,
    blurb: place.card_tagline_en,
    caption: place.card_caption,
    src: place.card_image_url,
    category: place.area_en,
    region: place.name_en,
  };
}
