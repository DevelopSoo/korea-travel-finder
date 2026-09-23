import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "./supabase/public";
import type { Experience } from "./types";

// Supabase `experiences` 표에서 읽는다. 1시간마다, 또는 /api/revalidate 가 불리면 새로 읽는다.
// 목록은 이 함수 하나로만 가져온다 — 아래 함수들은 캐시된 목록을 걸러 쓰므로 DB 를 다시 부르지 않는다
export async function getPublishedExperiences(): Promise<Experience[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("experiences");

  const { data, error } = await createPublicClient()
    .from("experiences")
    .select("*")
    .eq("is_published", true)
    .order("id");
  if (error) throw new Error(`experiences 를 읽지 못했다: ${error.message}`);

  // duration·price_level·점수 칸은 표의 check 제약이 types.ts 의 값만 받는다.
  // image_credits 는 jsonb — 마이그레이션이 배열만 받는다
  return data as unknown as Experience[];
}

export async function getExperience(
  slug: string,
): Promise<Experience | undefined> {
  const experiences = await getPublishedExperiences();
  return experiences.find((experience) => experience.slug === slug);
}

// "You might also like" — related_slugs 순서대로 최대 3개
export async function getRelatedExperiences(
  experience: Experience,
): Promise<Experience[]> {
  const experiences = await getPublishedExperiences();
  return experience.related_slugs
    .map((slug) => experiences.find((related) => related.slug === slug))
    .filter((related): related is Experience => related !== undefined)
    .slice(0, 3);
}
