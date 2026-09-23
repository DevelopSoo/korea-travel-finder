-- 사진 URL·출처 칸 (docs/plan/supabase-migration-plan.md "임시 사진")
-- 출처 모양: {"author", "author_url", "source", "source_url"}

-- experiences: image_urls 와 같은 순서의 출처 배열
alter table public.experiences
  add column image_credits jsonb not null default '[]'
    check (jsonb_typeof(image_credits) = 'array');

-- places: 지역 상세 큰 사진(hero)과 카드·하루 흐름 사진(card). 캡션 칸은 이미 있다
alter table public.places
  add column hero_image_url text,
  add column hero_image_credit jsonb
    check (hero_image_credit is null or jsonb_typeof(hero_image_credit) = 'object'),
  add column card_image_url text,
  add column card_image_credit jsonb
    check (card_image_credit is null or jsonb_typeof(card_image_credit) = 'object');
