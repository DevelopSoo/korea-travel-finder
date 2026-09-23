-- 저장 목록: 로그인한 사람이 저장한 경험 (계획 §4.2 · §4.3).
-- 로그인하지 않은 사람의 저장은 브라우저(localStorage)에만 있고 이 표에 오지 않는다.

create table public.saved_experiences (
  -- 비워 두면 지금 로그인한 사람으로 채운다. 남의 id 는 RLS 가 막는다
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  experience_id bigint not null
    references public.experiences (id) on delete cascade,
  -- 저장 시점 (인수인계 §11). 목록 순서로도 쓴다
  created_at timestamptz not null default now(),
  -- 같은 경험을 두 번 저장할 수 없다. "내 목록 조회" 인덱스 역할도 한다
  primary key (user_id, experience_id)
);

-- 경험을 지울 때 cascade 가 이 표를 훑지 않도록
create index saved_experiences_experience_id_idx
  on public.saved_experiences (experience_id);

-- ─── 권한 · RLS ──────────────────────────────────────────
-- 로그인한 사람만 쓴다. 수정(update)은 필요 없어 주지 않는다.
revoke all on public.saved_experiences from anon, authenticated;
grant select, insert, delete on public.saved_experiences to authenticated;

alter table public.saved_experiences enable row level security;

create policy "본인 저장 목록만 읽는다"
  on public.saved_experiences for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "본인 저장 목록에만 추가한다"
  on public.saved_experiences for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "본인 저장 목록에서만 지운다"
  on public.saved_experiences for delete
  to authenticated
  using ((select auth.uid()) = user_id);
