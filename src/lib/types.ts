// 경험 한 개. 칸 이름은 Supabase 의 `experiences` 표와 똑같이 쓴다.
// `_en` 칸은 언어가 늘면 `_es`, `_fr` 칸이 옆에 붙는다.

// 지역 값은 DB `places.region` 이 정한다 (experiences.region 이 외래 키로 가리킨다).
// 대시보드에서 지역을 늘려도 코드를 고치지 않도록 고정 목록으로 두지 않는다
export type Region = string;
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

// 장소 한 개 (지역 안내 페이지 = /[lang]/places/{slug}).
// 경험(Experience)이 "무엇을 하는가"라면 장소는 "어디로 가는가"다.
export type Place = {
  slug: string;
  region: Region;
  name_en: string;
  // 제목 위 눈썹 글자. "Gangwon · East Coast"
  area_en: string;
  // 제목 밑 한 줄
  tagline_en: string;
  // 본문 구역 제목
  headline_en: string;
  // 본문 구역 제목 밑 한 줄
  lead_en: string;
  // 오른쪽 단 설명 글
  description_en: string;
  // 첫 화면 카드에 쓰는 짧은 한 줄
  card_tagline_en: string;
  // 사진 캡션 = alt 텍스트 (photos.md §3-1)
  hero_caption: string;
  card_caption: string;
  // "Plan your visit" 상자 — 3개
  plan: { title_en: string; desc_en: string }[];
  // "Make a day of it" 하루 흐름 — 3개
  day: { title_en: string; desc_en: string }[];
  is_published: boolean;
};
