// 경험 한 개 (PRD §6 표 1 `experiences`). 칸 이름은 표와 똑같이 쓴다.
// `_en` 칸은 언어가 늘면 `_es`, `_fr` 칸이 옆에 붙는다 (PRD §8).

export type Region = "gangneung" | "seoul";
export type Duration = "1-2h" | "half-day" | "full-day";
export type PriceLevel = "free" | "low" | "mid" | "high";
export type Score = 1 | 2 | 3 | 4 | 5;

export type Experience = {
  id: number;
  slug: string;
  name_en: string;
  tagline_en: string;
  why_not_seoul_en: string;
  description_en: string;
  how_to_get_there_en: string;
  region: Region;
  interest_tags: string[];
  style_tags: string[];
  duration: Duration;
  price_level: PriceLevel;
  best_time: string;
  english_ease: Score;
  localness: Score;
  booking_required: boolean;
  map_url: string;
  // 아직 사진이 없으면 비어 있을 수 있다 → 캡션만 있는 빈 네모로 보인다
  image_urls: string[];
  // image_urls 와 같은 순서의 "장소 · 시간" 캡션. 비워 두지 않는다 (photos.md §3-1)
  image_captions: [string, ...string[]];
  shorts_url: string | null;
  related_slugs: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
