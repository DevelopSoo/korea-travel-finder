import type { Experience } from "@/lib/types";

// 임시 샘플 10개 (강릉 6 + 서울 4, PRD §9 1주차). 문장은 임시 — 실제 데이터로 교체한다.
// 사진이 아직 없어 image_urls 는 비워 두었다 → 캡션만 있는 빈 네모로 보인다.
// design §7-4 대로라면 사진 없는 경험은 비공개지만, 화면 확인을 위해 지금만 공개로 둔다.
// shorts_url 은 가짜 링크를 만들지 않으려고 모두 null.
const created = "2026-09-11T00:00:00Z";

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const experiences: Experience[] = [
  {
    id: 1,
    slug: "jumunjin-fish-market-dawn",
    name_en: "Jumunjin Fish Market at Dawn",
    tagline_en: "Watch the night's catch come in before the town wakes up",
    why_not_seoul_en:
      "A working east-coast harbor market — Seoul's markets sell what arrives here hours later",
    description_en: `Jumunjin is a small fishing port on the northern edge of Gangneung. Boats come back before sunrise, and by five the market floor is already wet, loud and busy. Squid, crab and flatfish are sorted in plastic tubs while traders call out prices to restaurant owners who have driven in from across the province.

Come early and walk slowly. Nobody minds if you just watch, and most stalls will point at a price on a cardboard sign if you ask. Around the edges, small restaurants will cook what you buy downstairs for a table fee. Breakfast here is raw fish, spicy fish stew or a bowl of rice with whatever came in that morning.

By nine the tour buses start to arrive and the mood changes. The quiet hour before that is the reason to come.`,
    how_to_get_there_en:
      "KTX to Gangneung, then a local bus or taxi north along the coast (about 30 min)",
    region: "gangneung",
    interest_tags: ["food", "local", "sea"],
    style_tags: ["local_style"],
    duration: "1-2h",
    price_level: "low",
    best_time: "Year-round, 05:00–07:00",
    english_ease: 2,
    localness: 5,
    booking_required: false,
    map_url: maps("Jumunjin Fish Market"),
    image_urls: [],
    image_captions: ["Jumunjin, Gangneung · 05:40"],
    shorts_url: null,
    related_slugs: [
      "anmok-beach-dawn-coffee",
      "chodang-sundubu-breakfast",
      "sogeumgang-valley-hike",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 2,
    slug: "daegwallyeong-sheep-farm",
    name_en: "Daegwallyeong Sheep Farm Walk",
    tagline_en: "A quiet hillside walk above the clouds",
    why_not_seoul_en: "Korea's highlands — nothing like this exists near Seoul",
    description_en: `Daegwallyeong is the high pass that separates Gangneung from the mountains inland. Up here the air is cooler, the wind rarely stops, and on many mornings the valley below disappears under cloud. The sheep farm sits on a rounded ridge with a fenced path that loops through grazing fields.

The walk itself is gentle and takes under an hour, but most people stay longer. There is a small barn where you can feed the sheep hay, and a few benches facing east where you can watch the weather move over the ridges. After rain the grass turns a very deep green and the crowds thin out.

Bring a layer even in summer. It can be several degrees colder than on the coast, and the wind makes it feel colder still.`,
    how_to_get_there_en:
      "Bus from Gangneung to Hoenggye, then a short taxi up the pass",
    region: "gangneung",
    interest_tags: ["nature"],
    style_tags: ["slow", "active"],
    duration: "half-day",
    price_level: "low",
    best_time: "Spring–Autumn, morning",
    english_ease: 3,
    localness: 4,
    booking_required: false,
    map_url: maps("Daegwallyeong Sheep Farm"),
    image_urls: [],
    image_captions: ["Daegwallyeong · after rain"],
    shorts_url: null,
    related_slugs: [
      "sogeumgang-valley-hike",
      "ojukheon-house",
      "anmok-beach-dawn-coffee",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 3,
    slug: "anmok-beach-dawn-coffee",
    name_en: "Anmok Beach Coffee Street at Sunrise",
    tagline_en: "Watch the East Sea turn pink with a cup from a local roaster",
    why_not_seoul_en:
      "Seoul has cafés; it doesn't have a sunrise over open sea from the counter",
    description_en: `Anmok Beach is a short strip of sand south of Gangneung Port, lined with a long row of cafés facing the water. Years ago people came here for canned coffee from vending machines on the seawall. Now small roasters have taken over the buildings, and many open early for the sunrise.

Pick a window seat on an upper floor, or take a cup down to the sand. In late autumn and winter the sun comes up late enough that you do not need an alarm at four, and the beach is almost empty. Fishing boats cross the horizon while the light changes.

It is an easy morning with no plan. Walk the seawall afterwards toward the port and watch the ferries head out.`,
    how_to_get_there_en:
      "KTX to Gangneung, then a taxi to Anmok Beach (about 15 min)",
    region: "gangneung",
    interest_tags: ["sea", "food"],
    style_tags: ["slow", "easy"],
    duration: "1-2h",
    price_level: "low",
    best_time: "Autumn–Winter, sunrise",
    english_ease: 4,
    localness: 3,
    booking_required: false,
    map_url: maps("Anmok Beach Coffee Street"),
    image_urls: [],
    image_captions: ["Anmok Beach · 06:10, Nov"],
    shorts_url: null,
    related_slugs: [
      "jumunjin-fish-market-dawn",
      "chodang-sundubu-breakfast",
      "ojukheon-house",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 4,
    slug: "ojukheon-house",
    name_en: "Ojukheon, a Joseon Scholar's Home",
    tagline_en: "Black bamboo and old wooden halls where Yulgok was born",
    why_not_seoul_en:
      "A family house in its own garden, not a palace rebuilt in the middle of traffic",
    description_en: `Ojukheon is the house where Yi I, a Joseon-era scholar better known as Yulgok, was born in the sixteenth century. His mother, Shin Saimdang, was a painter and poet, and both of them now appear on Korean banknotes. The name comes from the black bamboo that still grows around the grounds.

The main hall is one of the oldest wooden houses still standing in Korea. It is small, plain and quiet, which is exactly the point. Walk slowly through the courtyard, look at the roof lines against the pine trees, and then visit the small museum beside it.

Rainy mornings are the best time. The wood darkens, the bamboo moves in the wind, and school groups have not arrived yet.`,
    how_to_get_there_en:
      "Local bus from Gangneung Station (about 20 min) or a short taxi",
    region: "gangneung",
    interest_tags: ["history"],
    style_tags: ["slow", "easy"],
    duration: "1-2h",
    price_level: "low",
    best_time: "Year-round, morning",
    english_ease: 3,
    localness: 3,
    booking_required: false,
    map_url: maps("Ojukheon Gangneung"),
    image_urls: [],
    image_captions: ["Ojukheon · 09:00, rain"],
    shorts_url: null,
    related_slugs: [
      "chodang-sundubu-breakfast",
      "anmok-beach-dawn-coffee",
      "daegwallyeong-sheep-farm",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 5,
    slug: "chodang-sundubu-breakfast",
    name_en: "Chodang Soft Tofu Breakfast",
    tagline_en: "Silky tofu made with seawater, eaten where it began",
    why_not_seoul_en:
      "Chodang tofu is set with East Sea water — it tastes different here",
    description_en: `Chodang is a neighborhood near Gyeongpo Lake known for one thing: sundubu, a soft, barely set tofu. Instead of a store-bought coagulant, local cooks have long used clean seawater to set the soy milk, which gives it a faint salty sweetness.

A whole street of family restaurants serves it. Order the white version first to taste the tofu itself, then try the red, spicy one if you want more heat. It comes with rice and a few side dishes. Many places open early and are full of locals before work.

After breakfast, walk to the pine forest at the edge of the lake. It is a good way to slow down before the rest of the day.`,
    how_to_get_there_en:
      "KTX to Gangneung, then a taxi to Chodang-dong (about 15 min)",
    region: "gangneung",
    interest_tags: ["food", "local"],
    style_tags: ["local_style", "easy"],
    duration: "1-2h",
    price_level: "low",
    best_time: "Year-round, 07:00–09:00",
    english_ease: 2,
    localness: 5,
    booking_required: false,
    map_url: maps("Chodang Sundubu Village Gangneung"),
    image_urls: [],
    image_captions: ["Chodang-dong · 08:00"],
    shorts_url: null,
    related_slugs: [
      "jumunjin-fish-market-dawn",
      "ojukheon-house",
      "anmok-beach-dawn-coffee",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 6,
    slug: "sogeumgang-valley-hike",
    name_en: "Sogeumgang Valley Hike",
    tagline_en: "Granite pools and waterfalls on the edge of Odaesan",
    why_not_seoul_en:
      "A real mountain valley with clear water — Seoul's hills are close, but not like this",
    description_en: `Sogeumgang is a steep, rocky valley on the eastern side of Odaesan National Park, inside Gangneung's borders. The trail follows a stream over pale granite, past deep green pools and a series of small waterfalls. The name means "little Geumgang", after the famous mountains in the north.

The lower section is an easy walk on a wide path and is fine for most people. Further in, the trail climbs harder toward the ridge, so decide how far to go before you start. In October the maples along the water turn red and orange, and weekday mornings are much quieter than weekends.

Bring water and food. There are only a few small shops near the entrance, and none on the trail.`,
    how_to_get_there_en:
      "Bus from Gangneung to the Sogeumgang entrance (about 1 hour)",
    region: "gangneung",
    interest_tags: ["nature"],
    style_tags: ["active"],
    duration: "half-day",
    price_level: "free",
    best_time: "Autumn, morning",
    english_ease: 2,
    localness: 4,
    booking_required: false,
    map_url: maps("Sogeumgang Valley"),
    image_urls: [],
    image_captions: ["Sogeumgang · 07:30, Oct"],
    shorts_url: null,
    related_slugs: [
      "daegwallyeong-sheep-farm",
      "jumunjin-fish-market-dawn",
      "ojukheon-house",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 7,
    slug: "mangwon-market-lunch",
    name_en: "Mangwon Market Lunch Crawl",
    tagline_en: "Snack your way through a market locals actually use",
    why_not_seoul_en:
      "Not Myeongdong — a daily market where people buy dinner, not souvenirs",
    description_en: `Mangwon Market sits in a residential neighborhood near the Han River, west of Hongdae. It is where people from the surrounding apartments buy vegetables, side dishes and fried chicken on the way home. Prices are written on cardboard and nothing is staged for visitors.

Go around lunchtime and eat standing up. Pick up fried dumplings from one stall, a paper cup of tteokbokki from another, and croquettes from a bakery near the entrance. Most vendors are used to pointing, and cards are widely accepted.

When you are full, walk to Mangwon Hangang Park and sit by the river. It is one of the easiest ways to see an ordinary Seoul afternoon.`,
    how_to_get_there_en:
      "Subway Line 6 to Mangwon Station, then a 5-minute walk",
    region: "seoul",
    interest_tags: ["food", "local"],
    style_tags: ["local_style", "easy"],
    duration: "1-2h",
    price_level: "low",
    best_time: "Year-round, 11:30–14:00",
    english_ease: 3,
    localness: 4,
    booking_required: false,
    map_url: maps("Mangwon Market Seoul"),
    image_urls: [],
    image_captions: ["Mangwon Market · 12:30"],
    shorts_url: null,
    related_slugs: [
      "euljiro-print-alleys",
      "seochon-back-lanes",
      "inwangsan-sunset-walk",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 8,
    slug: "inwangsan-sunset-walk",
    name_en: "Inwangsan Sunset Ridge Walk",
    tagline_en: "A short climb along the old city wall to watch Seoul light up",
    why_not_seoul_en:
      "The city looks small from up here — a reminder of how much Korea lies beyond it",
    description_en: `Inwangsan is a rocky hill on the western side of central Seoul, crossed by a restored section of the old city wall. The trail is mostly stone steps, steep in places, and reaches the top in about an hour.

From the summit you can see palace roofs, office towers and the mountains that ring the city. Arrive about an hour before sunset, find a rock to sit on and wait for the lights to come on below. On clear autumn evenings the ridges to the north turn blue one by one.

Bring a light for the way down and wear shoes with grip. The steps are uneven and can be slippery after rain.`,
    how_to_get_there_en:
      "Subway Line 3 to Dongnimmun Station, then walk to the trailhead",
    region: "seoul",
    interest_tags: ["nature", "history"],
    style_tags: ["active"],
    duration: "1-2h",
    price_level: "free",
    best_time: "Spring and Autumn, sunset",
    english_ease: 3,
    localness: 4,
    booking_required: false,
    map_url: maps("Inwangsan Seoul"),
    image_urls: [],
    image_captions: ["Inwangsan · 18:40, Sep"],
    shorts_url: null,
    related_slugs: [
      "seochon-back-lanes",
      "mangwon-market-lunch",
      "euljiro-print-alleys",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 9,
    slug: "euljiro-print-alleys",
    name_en: "Euljiro Print Shop Alleys",
    tagline_en: "Old workshops, loud machines and bars hidden above them",
    why_not_seoul_en:
      "The Seoul that built everything else — still working, still unpolished",
    description_en: `Euljiro is a grid of narrow alleys in central Seoul filled with small print shops, lighting stores and metal workshops. Many have been run by the same families for decades. During the day, hand carts squeeze past and machines clatter behind half-open shutters.

Walk without a map. Look for stacks of paper on carts, neon signs made to order and staircases leading up to unmarked doors. In recent years some of those doors have become cafés and small bars, which fill up with office workers in the evening.

Be polite around the workshops. These are working places, so ask before taking photos of people, and step aside when a delivery comes through.`,
    how_to_get_there_en: "Subway Line 2 or 3 to Euljiro 3-ga Station",
    region: "seoul",
    interest_tags: ["local", "kculture"],
    style_tags: ["local_style", "slow"],
    duration: "1-2h",
    price_level: "free",
    best_time: "Weekdays, late afternoon",
    english_ease: 2,
    localness: 5,
    booking_required: false,
    map_url: maps("Euljiro 3-ga Seoul"),
    image_urls: [],
    image_captions: ["Euljiro 3-ga · 16:00"],
    shorts_url: null,
    related_slugs: [
      "mangwon-market-lunch",
      "seochon-back-lanes",
      "inwangsan-sunset-walk",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
  {
    id: 10,
    slug: "seochon-back-lanes",
    name_en: "Seochon Back Lanes",
    tagline_en: "Hanok houses, tiny bookshops and a slower side of central Seoul",
    why_not_seoul_en:
      "Beside the palace crowds, a neighborhood where people still live in the old houses",
    description_en: `Seochon is the area just west of Gyeongbokgung Palace, between the palace wall and Inwangsan. Unlike the better-known hanok village on the other side of the palace, most houses here are ordinary homes, mixed with small galleries, bookshops and family restaurants.

Start at Tongin Market, where you can fill a lunch box with side dishes paid for with old-style brass coins. Then wander the lanes heading uphill. Look for tiled roofs, potted plants on doorsteps and cats asleep on the walls.

Weekend mornings are calm, and many shops open late, so there is time to walk before the cafés fill up. Keep your voice low; the people living here appreciate it.`,
    how_to_get_there_en:
      "Subway Line 3 to Gyeongbokgung Station, then a 5-minute walk",
    region: "seoul",
    interest_tags: ["history", "local"],
    style_tags: ["slow", "easy"],
    duration: "1-2h",
    price_level: "free",
    best_time: "Year-round, weekend morning",
    english_ease: 4,
    localness: 3,
    booking_required: false,
    map_url: maps("Seochon Seoul"),
    image_urls: [],
    image_captions: ["Seochon · 10:00, Sun"],
    shorts_url: null,
    related_slugs: [
      "inwangsan-sunset-walk",
      "euljiro-print-alleys",
      "mangwon-market-lunch",
    ],
    is_published: true,
    created_at: created,
    updated_at: created,
  },
];
