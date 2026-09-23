-- 콘텐츠 표: 지역 안내(places)와 경험(experiences).
-- 사이트는 공개 키로 "공개된 행 읽기"만 한다. 쓰기는 대시보드·마이그레이션으로만.
-- 칸 이름은 src/lib/types.ts 의 Place, Experience 와 같다.

-- 수정 시각 자동 갱신 (두 표가 같이 쓴다).
-- 예전 실험에서 같은 이름(SECURITY DEFINER)이 남아 있어 or replace 로 덮어쓴다
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- 트리거 전용이라 API 로 부를 일이 없다
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- ─── places ──────────────────────────────────────────────
-- region 이 기본 키다. 경험과 지역을 region 값으로 잇는다.
create table public.places (
  region text primary key
    check (region ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name_en text not null,
  area_en text not null,
  tagline_en text not null,
  headline_en text not null,
  lead_en text not null,
  description_en text not null,
  card_tagline_en text not null,
  hero_caption text not null,
  card_caption text not null,
  -- 항상 3개씩: [{title_en, desc_en}]
  plan jsonb not null
    check (jsonb_typeof(plan) = 'array' and jsonb_array_length(plan) = 3),
  day jsonb not null
    check (jsonb_typeof(day) = 'array' and jsonb_array_length(day) = 3),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger places_set_updated_at
  before update on public.places
  for each row execute function public.set_updated_at();

-- ─── experiences ─────────────────────────────────────────
-- URL 은 slug, 다른 표가 가리킬 때는 id (slug 는 바뀔 수 있다).
create table public.experiences (
  id bigint generated always as identity primary key,
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name_en text not null,
  tagline_en text not null,
  why_not_seoul_en text not null,
  description_en text not null,
  how_to_get_there_en text not null,
  region text not null
    references public.places (region) on update cascade on delete restrict,
  interest_tags text[] not null default '{}',
  style_tags text[] not null default '{}',
  duration text not null
    check (duration in ('1-2h', 'half-day', 'full-day')),
  price_level text not null
    check (price_level in ('free', 'low', 'mid', 'high')),
  best_time text not null,
  english_ease smallint not null check (english_ease between 1 and 5),
  localness smallint not null check (localness between 1 and 5),
  booking_required boolean not null default false,
  map_url text not null,
  -- 사진이 아직 없으면 비어 있을 수 있다
  image_urls text[] not null default '{}',
  -- image_urls 와 같은 순서의 캡션. 최소 1개 (photos.md §3-1)
  image_captions text[] not null
    check (cardinality(image_captions) >= 1),
  shorts_url text,
  related_slugs text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 외래 키 + 지역 상세·필터에서 region 으로 거른다
create index experiences_region_idx on public.experiences (region);

create trigger experiences_set_updated_at
  before update on public.experiences
  for each row execute function public.set_updated_at();

-- ─── 권한 · RLS ──────────────────────────────────────────
-- 새 표는 Data API 에 자동 노출되지 않으므로 읽기만 명시적으로 준다.
revoke all on public.places, public.experiences from anon, authenticated;
grant select on public.places, public.experiences to anon, authenticated;

alter table public.places enable row level security;
alter table public.experiences enable row level security;

create policy "공개된 지역은 누구나 읽는다"
  on public.places for select
  to anon, authenticated
  using (is_published);

create policy "공개된 경험은 누구나 읽는다"
  on public.experiences for select
  to anon, authenticated
  using (is_published);
