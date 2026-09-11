import { experiences } from "@/data/experiences.sample";
import type { Experience } from "./types";

// 결과 카드 개수 (PRD 미결 5번 임시 결정)
export const MAX_RESULTS = 8;

// 지금은 샘플 파일에서 읽는다. Supabase 가 붙으면 이 파일만 바꾼다
export function getPublishedExperiences(): Experience[] {
  return experiences.filter((experience) => experience.is_published);
}

export function getExperience(slug: string): Experience | undefined {
  return getPublishedExperiences().find(
    (experience) => experience.slug === slug,
  );
}

// "You might also like" — related_slugs 순서대로 최대 3개
export function getRelatedExperiences(experience: Experience): Experience[] {
  return experience.related_slugs
    .map(getExperience)
    .filter((related): related is Experience => related !== undefined)
    .slice(0, 3);
}
