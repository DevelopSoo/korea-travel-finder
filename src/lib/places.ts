import { places } from "@/data/places.sample";
import { getPublishedExperiences } from "./experiences";
import type { Experience, Place } from "./types";

// 지금은 샘플 파일에서 읽는다. Supabase 가 붙으면 이 파일만 바꾼다
export function getPublishedPlaces(): Place[] {
  return places.filter((place) => place.is_published);
}

export function getPlace(slug: string): Place | undefined {
  return getPublishedPlaces().find((place) => place.slug === slug);
}

// 그 지역의 경험 목록
export function getPlaceExperiences(place: Place): Experience[] {
  return getPublishedExperiences().filter(
    (experience) => experience.region === place.region,
  );
}

// 경험이 속한 장소 — breadcrumb 과 "지역 안내 보기" 링크에 쓴다
export function getPlaceOfExperience(
  experience: Experience,
): Place | undefined {
  return getPublishedPlaces().find(
    (place) => place.region === experience.region,
  );
}
