import type { Place } from "@/lib/types";

// 임시 샘플 2곳. experiences.sample.ts 의 region 값과 짝이 맞아야 한다.
// 장소를 늘릴 때는 그 지역 경험이 먼저 있어야 한다 — 빈 지역 페이지는 만들지 않는다.
export const places: Place[] = [
  {
    slug: "gangneung",
    region: "gangneung",
    name_en: "Gangneung",
    area_en: "Gangwon · East Coast",
    tagline_en: "Coffee, coastal walks and slow mornings.",
    headline_en: "A slower side of Korea.",
    lead_en: "Make room for sea air, neighborhood cafés and everyday discoveries.",
    description_en:
      "Where the mountains meet the sea, Gangneung keeps a slower pace than the capital. Coffee roasters line the beach road, pine trails run right down to the water, and the fish markets are still working markets rather than sights. Two hours from Seoul by train, and a different country by the time you get off it.",
    card_tagline_en: "Coffee with a sea breeze",
    hero_caption: "Anmok Beach, Gangneung · 06:20",
    card_caption: "Gyeongpo, Gangneung · 17:10",
    plan: [
      {
        title_en: "Getting there",
        desc_en: "KTX from Seoul Station, about 2 hours to Gangneung Station.",
      },
      {
        title_en: "Best months",
        desc_en: "May to June and September to October. August is the busy month.",
      },
      {
        title_en: "Getting around",
        desc_en: "Local buses reach the coast; taxis are cheap for short hops.",
      },
    ],
    day: [
      {
        title_en: "Start at the harbor",
        desc_en: "The market floor is busiest before seven, and quiet again by nine.",
      },
      {
        title_en: "Coffee on the beach road",
        desc_en: "Anmok has a row of roasters facing the water. Take the slow one.",
      },
      {
        title_en: "Walk the pine trail",
        desc_en: "The shore path runs north from Gyeongpo. An hour, flat the whole way.",
      },
    ],
    is_published: true,
  },
  {
    slug: "seoul",
    region: "seoul",
    name_en: "Seoul",
    area_en: "Sudogwon · Han River",
    tagline_en: "The parts of the city the tour buses skip.",
    headline_en: "Seoul, one street back.",
    lead_en: "Not the landmarks — the neighborhoods people actually live in.",
    description_en:
      "Most trips to Korea start and end here, which is exactly why the interesting parts are easy to miss. Behind the main shopping streets are hillside neighborhoods, morning markets and workshops that have been in the same family for decades. These are the ones worth the detour.",
    card_tagline_en: "One street back from the crowds",
    hero_caption: "Ihwa-dong, Seoul · 08:15",
    card_caption: "Seochon, Seoul · 19:40",
    plan: [
      {
        title_en: "Getting there",
        desc_en: "Incheon Airport to the city center by AREX, about an hour.",
      },
      {
        title_en: "Best months",
        desc_en: "April to May and October. July and August are hot and wet.",
      },
      {
        title_en: "Getting around",
        desc_en: "The subway reaches almost everything. Buy a T-money card first.",
      },
    ],
    day: [
      {
        title_en: "Morning on the hill",
        desc_en: "The old neighborhoods north of the palaces are quietest before ten.",
      },
      {
        title_en: "Lunch where the queue is",
        desc_en: "One-dish shops turn over fast. A short queue means a short wait.",
      },
      {
        title_en: "Evening by the water",
        desc_en: "The Han River parks fill up after work. That is the point of them.",
      },
    ],
    is_published: true,
  },
];
