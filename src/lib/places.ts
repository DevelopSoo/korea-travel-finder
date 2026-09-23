import { cacheLife, cacheTag } from "next/cache";
import { getPublishedExperiences } from "./experiences";
import { createPublicClient } from "./supabase/public";
import type { Experience, Place } from "./types";

// Supabase `places` 표에서 읽는다. 1시간마다, 또는 /api/revalidate 가 불리면 새로 읽는다
export async function getPublishedPlaces(): Promise<Place[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("places");

  const { data, error } = await createPublicClient()
    .from("places")
    .select(
      "slug, region, name_en, area_en, tagline_en, headline_en, lead_en, description_en, card_tagline_en, hero_caption, card_caption, hero_image_url, hero_image_credit, card_image_url, card_image_credit, plan, day, is_published",
    )
    .eq("is_published", true)
    .order("region");
  if (error) throw new Error(`places 를 읽지 못했다: ${error.message}`);

  // plan·day 는 jsonb — 표의 check 제약이 3개짜리 배열만 받는다. 사진 출처도 jsonb
  return data.map((row) => ({
    ...row,
    plan: row.plan as Place["plan"],
    day: row.day as Place["day"],
    hero_image_credit: row.hero_image_credit as Place["hero_image_credit"],
    card_image_credit: row.card_image_credit as Place["card_image_credit"],
  }));
}

export async function getPlace(slug: string): Promise<Place | undefined> {
  const places = await getPublishedPlaces();
  return places.find((place) => place.slug === slug);
}

// 그 지역의 경험 목록
export async function getPlaceExperiences(place: Place): Promise<Experience[]> {
  const experiences = await getPublishedExperiences();
  return experiences.filter((experience) => experience.region === place.region);
}

// 경험이 속한 장소 — breadcrumb 과 "지역 안내 보기" 링크에 쓴다
export async function getPlaceOfExperience(
  experience: Experience,
): Promise<Place | undefined> {
  const places = await getPublishedPlaces();
  return places.find((place) => place.region === experience.region);
}

// region → 지역 이름. 카드 눈썹 글자에 쓴다. 지역 이름은 places.name_en 한 곳에만 둔다
export async function getRegionNames(): Promise<Record<string, string>> {
  const places = await getPublishedPlaces();
  return Object.fromEntries(places.map((place) => [place.region, place.name_en]));
}
