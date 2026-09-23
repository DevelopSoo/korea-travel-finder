# Supabase 이전 계획 — 콘텐츠 DB · 선택 로그인 · 저장 동기화

작성일: 2026-09-23 · 버전: 1.1 · 관련 문서: `docs/plan/experience-korea-mvp-handoff.md` (v1.1 변경 이력 참고)

## 0. 한 줄 요약

**콘텐츠를 DB로 옮기고 → 이메일·비밀번호 로그인을 붙이고 → 저장 목록을 로그인한 사람만 DB에 저장한다.** 로그인은 선택 사항이며, 로그인하지 않은 사람은 지금처럼 이 기기(브라우저)에 저장한다.

## 1. 이번에 확정한 결정

| 결정 | 내용 |
|---|---|
| 로그인 여부 | **선택 사항.** 로그인하지 않아도 탐색·저장이 모두 된다. 로그인하면 저장 목록이 계정에 남아 다른 기기에서도 보인다. |
| 로그인 방식 | **이메일 + 비밀번호 한 가지.** 소셜 로그인·매직링크는 넣지 않는다. |
| 이메일 인증 | **Supabase에서 끈다** (Authentication → Sign In / Providers → Email → *Confirm email* 끔). 가입 즉시 로그인된다. |
| 저장 단위 | 기존대로 **경험만** 저장한다. 지역 저장은 넣지 않는다. |
| 콘텐츠 반영 시점 | **1시간마다 자동 반영 + 즉시 반영.** Supabase에서 경험·지역을 고치면 Database Webhook이 사이트의 캐시 비우기 주소를 불러 바로 반영된다. 웹훅이 실패해도 최대 1시간 뒤에는 반영된다. **첫 배포에서는 웹훅을 보류했다** — 최대 1시간 뒤 자동 반영, 급할 때는 직접 부른다 (§5 배포 진행 기록). |
| 비밀번호 재설정 | **나중에.** 이메일 인증을 켤 때 함께 넣는다 (§6). |
| 범위 밖 유지 | Stories, 후기, AI 일정, 예약·결제, 자동 개인화는 이번 작업에 넣지 않는다. |

이 결정으로 인수인계 문서의 “회원 계정 및 기기 간 동기화는 초기 범위 밖” 항목이 바뀌었다. 바뀐 내용은 인수인계 문서 앞부분 **변경 이력**에 기록했다.

## 2. 지금 상태 (2026-09-23 확인)

| 영역 | 현재 | 파일 |
|---|---|---|
| 경험·지역 콘텐츠 | 코드 안 샘플 배열에서 읽음 (경험 10개, 지역 2곳) | `src/data/*.sample.ts` |
| 콘텐츠 읽기 함수 | “Supabase가 붙으면 이 파일만 바꾼다”는 전제로 한곳에 모여 있음 | `src/lib/experiences.ts`, `src/lib/places.ts` |
| 데이터 모양 | 칸 이름을 Supabase `experiences` 표 기준으로 이미 맞춰 둠 | `src/lib/types.ts` |
| 저장 목록 | localStorage `ek.saved.v1`에 경험 **slug** 배열 | `src/lib/useSaved.ts` |
| 저장 목록을 쓰는 곳 | 머리 숫자, 책갈피, 저장 버튼, 저장 페이지 — 모두 `useSaved()` 하나만 씀 | `Header.tsx`, `BookmarkButton.tsx`, `SaveButton.tsx`, `SavedList.tsx` |
| Supabase 연결 | 브라우저·서버 클라이언트와 세션 갱신(`proxy.ts`)까지 설정됨, 실제 사용처는 없음 | `src/lib/supabase/*`, `src/proxy.ts` |
| Supabase DB | `public` 스키마에 표 없음 | — |
| 페이지 생성 방식 | 경험·지역 상세가 `generateStaticParams`로 미리 만들어짐 | `experiences/[slug]/page.tsx`, `places/[slug]/page.tsx` |
| 안내 문구 | “계정을 요구하지 않고 이메일도 모으지 않는다”, “이 기기에 저장” (4단계에서 고침) | `src/messages/en.json` (`privacy`, `saved.device`) |

**좋은 점:** 콘텐츠 읽기는 `experiences.ts`·`places.ts` 두 파일에만 있고, 저장은 `useSaved()` 하나로만 쓰인다. 그래서 이 세 파일의 **안쪽만 바꾸면** 화면 부품은 거의 건드리지 않아도 된다.

## 3. 왜 이 순서인가

```
1단계 DB 설계·콘텐츠 이전  →  2단계 인증  →  3단계 저장 동기화  →  4단계 문구·마무리
```

- **DB가 먼저인 이유:** 저장 표는 “어느 사용자가 어느 경험을 저장했나”를 담는다. 경험 표가 먼저 있어야 저장이 그것을 가리킬 수 있다. 콘텐츠 이전은 로그인과 상관없이 모든 방문자에게 영향을 주고, 되돌리기도 쉽다.
- **인증이 저장보다 먼저인 이유:** 저장 동기화는 “지금 로그인했는가”에 따라 저장 위치가 바뀐다. 로그인 상태를 알 수 있어야 만들 수 있다.
- **문구가 마지막인 이유:** 개인정보 안내는 실제 동작이 확정된 뒤에 써야 사실과 어긋나지 않는다. 다만 **로그인을 공개하는 배포에는 반드시 함께 들어가야 한다** (4단계 참고).

각 단계는 브랜치 하나, PR 하나로 끝낸다. 한 단계가 끝나면 사이트는 그 상태로도 정상 동작해야 한다.

## 4. 데이터베이스 설계 초안

실제 SQL은 각 단계에서 `supabase-postgres-best-practices` 기준으로 작성한다. 여기서는 구조와 규칙만 정한다.

### 4.1 표 목록과 관계

```mermaid
erDiagram
    places ||--o{ experiences : "region 으로 연결"
    experiences ||--o{ saved_experiences : "저장됨"
    auth_users ||--o{ saved_experiences : "저장함"

    places {
        text region PK "gangneung, seoul …"
        text slug UK
        text name_en
        jsonb plan "3개 [{title_en, desc_en}]"
        jsonb day "3개 [{title_en, desc_en}]"
        boolean is_published
    }
    experiences {
        bigint id PK
        text slug UK
        text region FK
        text_array interest_tags
        text_array related_slugs
        boolean is_published
        timestamptz updated_at
    }
    saved_experiences {
        uuid user_id PK "auth.users.id"
        bigint experience_id PK
        timestamptz created_at
    }
```

(칸 전체 목록은 `src/lib/types.ts`의 `Experience`, `Place`를 그대로 따른다.)

### 4.2 표별 설계 메모

**`places` — 지역 안내**
- 기본 키는 `region`(text). 지금 코드가 경험과 지역을 `region` 값으로 잇고 있어서, 이 값을 그대로 키로 쓰면 코드를 바꿀 곳이 가장 적다.
- `plan`, `day`는 항상 3개씩 묶여 다니고 따로 검색할 일이 없으므로 `jsonb`로 둔다.
- 지금 `Region` 타입이 `"gangneung" | "seoul"`로 고정되어 있다. 지역이 DB에서 늘어나면 이 타입을 `string`으로 풀거나, 생성된 DB 타입을 쓰도록 바꾼다.

**`experiences` — 경험**
- 기본 키 `id`(bigint, 자동 증가), `slug`에는 unique를 건다. URL은 slug를 쓰고, 다른 표가 가리킬 때는 id를 쓴다 (slug는 바뀔 수 있으므로).
- `region`은 `places.region`을 가리키는 외래 키. 인덱스를 함께 만든다 (지역 상세·필터에서 자주 거른다).
- `duration`, `price_level`은 `check` 제약으로 허용 값을 제한한다 (`types.ts`의 값과 동일). `english_ease`, `localness`는 1–5 `check`.
- `interest_tags`, `style_tags`, `image_urls`, `image_captions`, `related_slugs`는 `text[]`. 초기 콘텐츠 규모(수십 개)에서는 별도 표로 쪼갤 이득이 없다.
- `updated_at`은 수정 시 자동으로 바뀌도록 트리거를 둔다.

**`saved_experiences` — 저장 목록 (로그인한 사람만)**
- 기본 키 `(user_id, experience_id)` — 같은 경험을 두 번 저장할 수 없다. 이 키가 “내 저장 목록 조회”용 인덱스 역할도 한다.
- `user_id` → `auth.users(id)` **on delete cascade**: 계정을 지우면 저장 목록도 지워진다.
- `experience_id` → `experiences(id)` **on delete cascade**. 비공개로 바뀐 경험은 행이 남지만 화면에서는 걸러진다 (인수인계 §9.2 “콘텐츠가 비공개·삭제됨” 처리).
- `created_at` = 인수인계 §11의 “저장 시점”.
- 사용자 프로필 표(`profiles`)는 만들지 않는다. 이메일은 Supabase 인증이 이미 보관하고, 지금 화면에 이름·사진을 보여줄 곳이 없다.

### 4.3 보안 규칙 (RLS)

모든 표에 RLS를 켠다.

| 표 | 누가 | 무엇을 |
|---|---|---|
| `places`, `experiences` | 누구나 (`anon`, `authenticated`) | `is_published = true`인 행만 **읽기** |
| `places`, `experiences` | 사이트에서는 아무도 | 쓰기 없음. 콘텐츠 수정은 Supabase 대시보드나 마이그레이션으로만 |
| `saved_experiences` | 로그인한 본인 (`authenticated`) | `user_id = (select auth.uid())`인 행만 읽기·추가·삭제. 수정(update)은 필요 없으므로 규칙을 만들지 않는다 |

- `auth.uid()`는 `(select auth.uid())`로 감싸 행마다 다시 계산하지 않게 한다.
- 비밀 키(`service_role`/secret key)는 사이트 코드에 쓰지 않는다. 지금 쓰는 공개 키(publishable key)와 RLS만으로 충분하다.
- 각 단계를 마친 뒤 Supabase advisors(보안·성능 점검)를 돌려 경고가 없는지 확인한다.

### 4.4 마이그레이션 관리

- 표 변경은 모두 SQL 파일로 저장소에 남긴다: `supabase/migrations/<시각>_<이름>.sql`.
- Supabase CLI는 설치되어 있지 않다 (2026-09-23 확인). 적용은 **Supabase MCP `apply_migration`**으로 하고, 같은 SQL을 위 경로에 파일로 저장한다. 파일과 실제 DB가 어긋나지 않도록 적용한 SQL을 그대로 복사한다.
- 샘플 콘텐츠는 별도 파일(`supabase/seed.sql` 또는 시드 마이그레이션)로 넣는다.
- 표를 바꿀 때마다 TypeScript 타입을 새로 만든다 → `src/lib/database.types.ts`.

## 5. 단계별 계획

### 1단계 — 콘텐츠 표 만들고 옮기기

**목표:** 사이트가 샘플 파일 대신 Supabase에서 경험·지역을 읽는다. 화면은 지금과 똑같아야 한다.

| 할 일 | 손대는 곳 |
|---|---|
| `places`, `experiences` 표 + RLS + 인덱스 마이그레이션 | `supabase/migrations/` |
| 샘플 10개 경험 · 2개 지역을 DB에 넣기 | 시드 SQL |
| DB 타입 생성 | `src/lib/database.types.ts` |
| 쿠키를 쓰지 않는 **공개 콘텐츠용 클라이언트** 추가 (아래 참고) | `src/lib/supabase/public.ts` (새 파일) |
| 읽기 함수를 DB 조회로 교체. 함수들이 `async`가 되므로 부르는 페이지에 `await` 추가 | `src/lib/experiences.ts`, `src/lib/places.ts`, 이를 쓰는 페이지들 |
| 샘플 파일은 시드가 끝나면 삭제 | `src/data/*.sample.ts` |
| Cache Components 켜기: `cacheComponents: true` | `next.config.ts` |
| 콘텐츠 읽기 함수에 `'use cache'` + `cacheLife('hours')` + `cacheTag('experiences')` / `cacheTag('places')` | `src/lib/experiences.ts`, `src/lib/places.ts` |
| 캐시 비우기 주소: `POST /api/revalidate` — 요청 헤더의 비밀 값이 `REVALIDATE_SECRET`과 같을 때만 `revalidateTag('experiences', 'max')`, `revalidateTag('places', 'max')` 실행. 다르면 401 | `src/app/api/revalidate/route.ts` (새 파일), `.env.local`, 배포 환경변수 |
| Supabase Database Webhook: `experiences`, `places` 표의 insert·update·delete 때 위 주소로 POST, 헤더에 비밀 값 | Supabase 대시보드 (Database → Webhooks). 배포 주소가 정해진 뒤 설정 |

**주의할 점**
- 콘텐츠는 로그인과 무관하므로 **쿠키를 읽지 않는** 클라이언트로 가져온다. 쿠키를 읽으면 페이지가 요청마다 새로 그려지는 방식으로 바뀌어, 지금의 미리 만들어 둔 페이지(`generateStaticParams`) 장점이 사라진다.
- 캐시는 이 버전의 기본 안내 방식(Cache Components)을 따른다. 작업 전 `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`, `09-revalidating.md`, `02-guides/migrating-to-cache-components.md`를 먼저 읽는다. `cacheComponents`를 켜면 기존 페이지(`generateStaticParams`, `proxy.ts`, 쿠키를 쓰는 곳)의 동작이 바뀔 수 있으므로 **켜자마자 `pnpm build`로 먼저 확인**하고, 문제가 크면 이전 방식(`02-guides/caching-without-cache-components.md`)으로 바꾸고 그 이유를 이 문서에 적는다.
- `'use cache'` 안에서는 쿠키를 읽을 수 없다. 공개 콘텐츠용 클라이언트가 쿠키를 쓰지 않아야 하는 또 하나의 이유다.
- `revalidateTag`는 Route Handler에서 쓸 수 있고, `updateTag`는 Server Action 전용이다. 웹훅은 Route Handler로 받으므로 `revalidateTag(tag, 'max')`를 쓴다.
- `REVALIDATE_SECRET`은 `NEXT_PUBLIC_`을 붙이지 않는다 (브라우저에 노출 금지). 로컬 개발에서는 웹훅이 localhost에 닿지 않으므로 curl로 직접 불러 확인한다.
- `getRelatedExperiences`처럼 목록 전체를 여러 번 훑는 함수는 요청 한 번에 DB를 여러 번 부르지 않도록 정리한다.

**완료 기준**
- 메인·지역 상세·경험 목록·경험 상세·저장 페이지가 이전과 같은 내용으로 보인다.
- DB에서 경험 하나를 `is_published = false`로 바꾸고 `/api/revalidate`를 부르면 다음 요청부터 사이트에서 사라진다. 비밀 값 없이 부르면 401이 돌아온다.
- 배포 후: 대시보드에서 경험 문구를 고치면 웹훅을 거쳐 새로고침 한두 번 안에 바뀐다.
- `pnpm build`, `pnpm lint` 통과. Supabase advisors 경고 없음.

**진행 기록 (2026-09-23, 브랜치 `feat/supabase-content-db`)**
- Cache Components는 켠 채로 유지했다. 빌드를 막은 곳은 `/experiences`의 `?i=` 읽기 한 곳뿐이었고, 그 부분만 `<Suspense>`로 감쌌다 (기다리는 동안에는 전체 목록을 보여 준다).
- `Region` 타입은 `string`으로 풀었다. 지역 이름은 `places.name_en` 한 곳에서만 가져오고 `en.json`의 `region` 묶음은 지웠다. 대시보드에서 지역을 늘려도 코드를 고칠 필요가 없다.
- 지역 목록 순서는 `region` 값의 알파벳순, 경험은 `id` 순이다. 순서를 직접 정해야 하면 순서 칸을 따로 추가한다.
- DB에는 예전 실험에서 남은 `public.set_updated_at()`(SECURITY DEFINER)이 있었다. 마이그레이션에서 `create or replace`로 SECURITY INVOKER로 바꾸고 실행 권한을 거뒀다.
- 새 표에 RLS를 자동으로 켜는 이벤트 트리거 함수 `public.rls_auto_enable()`(Supabase 문서 예제로 설치됨)을 누구나 실행할 수 있어 advisors가 경고했다. 직접 불러도 바뀌는 것은 없음을 확인한 뒤, 경고를 없애려고 `public`·`anon`·`authenticated`의 실행 권한을 거뒀다. 새 표 RLS 자동 켜기는 그대로 동작한다. 이 함수는 저장소 마이그레이션이 아니라 대시보드에서 만들어졌으므로, 새 프로젝트에 마이그레이션을 다시 적용할 때는 이 함수가 먼저 있어야 한다.
- `revalidateTag(…, 'max')`는 비운 직후 첫 요청에는 이전 내용을 주고 그동안 새로 읽는다. 로컬에서 비공개 전환 → 캐시 비우기 → 수 초 안에 목록·지역 상세·경험 상세(404)에서 사라지는 것을 확인했다.
- **웹훅 설정 시 필요한 값:** `POST https://<배포 주소>/api/revalidate`, 헤더 `x-revalidate-secret: <REVALIDATE_SECRET>`. 배포 환경변수에 `REVALIDATE_SECRET`을 같은 값으로 넣어야 한다 (없으면 500).

### 2단계 — 이메일·비밀번호 로그인

**목표:** 원하는 사람만 가입·로그인·로그아웃할 수 있다. 로그인하지 않은 사람의 경험은 지금과 똑같다.

| 할 일 | 손대는 곳 |
|---|---|
| Supabase 설정: Email 제공자 켜기, *Confirm email* 끄기, 비밀번호 최소 길이 확인 | Supabase 대시보드 |
| 가입·로그인 화면 (한 페이지에서 전환하거나 두 페이지) | `src/app/[lang]/login/` 등 (새로 만듦) |
| 가입·로그인·로그아웃 처리 (Server Action) | 새 파일, 서버 클라이언트 `src/lib/supabase/server.ts` 사용 |
| 머리 영역에 로그인 / 로그아웃 진입점 | `src/components/layout/Header.tsx` |
| 화면 문구 | `src/messages/en.json` |

**주의할 점**
- 서버에서 로그인 여부를 판단할 때는 `getSession()`이 아니라 `getClaims()`를 쓴다 (`proxy.ts`에 이미 적용되어 있음).
- 로그인이 필요한 페이지는 없다. 로그인 페이지만 새로 생기고 기존 페이지는 막지 않는다.
- 로그인 후에는 원래 보던 페이지로 돌려보낸다 (탐색 흐름을 끊지 않기 — 인수인계 §3.2). 돌아갈 주소는 **사이트 안 경로만** 허용한다 (외부 주소로 튕기는 것 방지).
- 이메일 인증이 꺼져 있으므로 **남의 이메일로도 가입할 수 있다.** 이 위험과 비밀번호 재설정 문제는 §6에 정리했다.
- 화면은 디자인 시스템 문서(`docs/design-system/index.md`)를 먼저 읽고 기존 부품(`ButtonPrimary`, 입력칸 등)으로 만든다.

**완료 기준**
- 가입 → 바로 로그인됨 → 새로고침해도 유지 → 로그아웃됨.
- 틀린 비밀번호, 이미 가입된 이메일, 짧은 비밀번호에 대해 알아볼 수 있는 오류가 보인다.
- 로그인하지 않은 상태로 모든 기존 경로(인수인계 §3.3)가 그대로 된다.

**진행 기록 (2026-09-23, 브랜치 `feat/email-password-auth`)**
- 대시보드: Email 제공자 켬, *Confirm email* 끔, 최소 비밀번호 길이 8자. 서버 액션(`MIN_PASSWORD`)과 화면 안내도 8자로 맞췄다. 길이를 바꾸면 세 곳을 함께 바꾼다.
- 가입·로그인은 한 페이지 `/[lang]/login`에서 `?mode=signup`으로 바꾼다. 처리는 `src/lib/authActions.ts`의 Server Action(`logIn`, `signUp`, `logOut`)이 한다.
- 돌아갈 주소는 `?next=`로 넘기고, 서버 액션이 `src/lib/safeNext.ts`로 다시 검사한다. URL로 풀어 같은 출처인지 보는 방식이라 `//`, `/\`, 탭이 섞인 주소, 외부 주소, `/login` 자신은 모두 `/[lang]`으로 바뀐다. 이미 로그인한 사람이 `/login`에 오면 `next`로 바로 보낸다.
- 머리의 로그인 상태는 **브라우저에서** 읽는다 (`src/lib/useAuth.ts`, `getClaims()`). 레이아웃이 쿠키를 읽지 않으므로 기존 페이지는 계속 정적으로 미리 만들어진다 (빌드 결과 확인). 서버 액션이 쿠키를 바꾸면 브라우저 클라이언트에 이벤트가 오지 않으므로 주소 이동, 로그아웃 직후, 탭으로 돌아올 때 다시 읽는다. 3단계 `useSaved`는 이 `useAuth()`의 `user`를 그대로 쓰면 된다.
- 로그아웃은 `signOut({ scope: "local" })`로 이 브라우저만 끊는다. 기본값(global)은 다른 기기의 로그인까지 끊는다. 로그아웃 뒤에는 보던 페이지에 그대로 머문다.
- 오류 문구: 틀린 비밀번호(`invalid_credentials`)는 이메일과 비밀번호 중 어느 쪽이 틀렸는지 알려 주지 않는다. 이미 가입된 이메일(`user_already_exists`), 짧은/약한 비밀번호, 잘못된 이메일, 요청 과다는 각각 따로 알린다. 모르는 오류는 서버 로그에 `[auth]`로 남기고 일반 문구를 보여 준다.
- 디자인 시스템에 입력 칸이 없어 `TextField`를 추가했다 (`components.md` §4-16, `/en/dev/ui`). 로그인 페이지는 `structure.md` 페이지 목록 9번으로 올렸다. `structure.md` §1-2 "계정도 없다"는 4단계에서 문구와 함께 고친다.
- 머리 오른쪽에 `Log in`/`Log out`이 붙어 **폭 320px 폰에서는 머리가 세 줄**이 된다 (360px 이상은 두 줄. 가로 스크롤은 없음).
- 로컬에서 확인: 가입 → 바로 로그인 → 원래 경험 페이지로 복귀 → 새로고침 유지 → 로그아웃, 오류 3종, 외부 `next` 차단. 테스트 계정은 확인 후 지웠다.
- advisors: 보안 경고 1건 **Leaked Password Protection Disabled** (유출된 비밀번호 차단, 대시보드 설정. Pro 요금제 이상에서만 켤 수 있음). 성능 INFO 1건(`experiences_region_idx` 미사용)은 1단계 인덱스로, 데이터가 적어서 생긴 것이라 그대로 둔다.

### 3단계 — 저장 목록 연결 (DB + 기기 저장 병행)

**목표:** 로그인한 사람의 저장은 DB에, 로그인하지 않은 사람의 저장은 지금처럼 이 기기에 남는다. 화면 부품은 차이를 몰라도 된다.

| 할 일 | 손대는 곳 |
|---|---|
| `saved_experiences` 표 + RLS 마이그레이션, 타입 재생성 | `supabase/migrations/`, `database.types.ts` |
| `useSaved()` 안쪽을 “로그인 상태에 따라 저장 위치를 바꾸는” 구조로 교체. **밖으로 내보내는 모양(`slugs`, `toggle`, `remove`, `isSaved`)은 그대로 유지** | `src/lib/useSaved.ts` |
| 로그인 순간 기기 목록을 계정으로 합치기 | `useSaved.ts` 또는 별도 모듈 |
| 저장 실패 처리 (되돌리기 + 알림) | `useSaved.ts`, 저장 버튼 |

**동작 규칙 (기본값 — 바꾸려면 §7에서 결정)**

| 상황 | 동작 |
|---|---|
| 로그인 안 함 | 지금과 동일: localStorage `ek.saved.v1`에 slug 저장 |
| 로그인 함 | DB `saved_experiences`에 저장. 화면은 먼저 바꾸고(빠른 반응), DB 저장이 실패하면 **원래대로 되돌리고 실패를 알린다** (인수인계 §9.3 “실패를 성공으로 표시하지 않는다”) |
| 로그인하는 순간 | 기기 목록의 slug를 경험 id로 바꿔 DB에 추가 (이미 있는 것은 건너뜀). 성공하면 기기 목록을 비운다 |
| 로그아웃 | 기기 목록(병합 후 비어 있음)을 보여준다. 계정 목록은 기기에 남기지 않는다 — 같은 기기를 다른 사람이 쓸 수 있으므로 |
| 다른 탭에서 로그인·로그아웃 | 인증 상태 변화 이벤트를 듣고 목록을 다시 불러온다 |

- 저장 페이지(`SavedList.tsx`)의 “없는 경험 자동 정리”는 로그인 상태에서는 DB 행을 지우는 대신 **화면에서만 걸러낸다**. 경험이 다시 공개되면 목록에 돌아오게 하기 위해서다.
- slug는 화면에서 쓰는 값, id는 DB에서 쓰는 값이다. 바꾸는 일은 `useSaved` 안에서만 한다.

**완료 기준 (인수인계 §13 시나리오 2·6 포함)**
- 로그인 상태에서 목록·지역 상세·경험 상세 어디서 저장해도 머리 숫자, 책갈피, 저장 페이지가 일치한다.
- 다른 브라우저에서 같은 계정으로 로그인하면 같은 목록이 보인다.
- 로그인 전 저장한 3개가 로그인 후 계정 목록에 합쳐지고, 중복이 생기지 않는다.
- 네트워크를 끊고 저장을 누르면 성공으로 표시되지 않는다.
- 다른 계정으로 로그인하면 앞 계정의 목록이 보이지 않는다 (RLS 확인).

**진행 기록 (2026-09-23, 브랜치 `feat/saved-experiences-sync`)**
- §7 결정: 로그인 후 기기 목록은 **합친 뒤 비운다**. 저장 해제 **실행 취소는 이번에 넣었다** (저장 페이지 Remove만, 로그인·비로그인 둘 다).
- 표: `saved_experiences` 마이그레이션 `20260923065217_create_saved_experiences.sql`. `user_id` 기본값이 `auth.uid()`라 사이트는 `experience_id`만 보낸다. 권한은 `authenticated`에만 select·insert·delete를 준다 (`anon`은 표에 접근할 수 없다). `experience_id`에는 경험 삭제 cascade용 인덱스를 따로 만들었다.
- `useSaved()`가 내보내는 모양(`slugs`, `toggle`, `remove`, `isSaved`)은 그대로다. `Header`, `BookmarkButton`, `SaveButton`은 고치지 않았다. 안에서 `useAuth()`의 `user`를 보고 저장 위치를 고른다. 서버는 쿠키를 읽지 않으므로 페이지는 계속 미리 만들어진다 (빌드 결과 확인).
- 로그인 상태를 확인하는 짧은 동안과 계정 목록을 불러오는 동안에는 **빈 목록**을 보여 준다. 이 기기에 남아 있던 목록이나 앞 사람의 목록이 섞여 보이지 않게 하기 위해서다. 계정 목록은 메모리에만 두고, 로그아웃하면 버린다.
- 합치기: slug를 id로 바꿔 `upsert(ignoreDuplicates)`로 넣는다 (이미 있는 것은 건너뜀). 성공하면 기기 목록을 비운다. 이때 공개되지 않은 경험(id를 못 찾은 slug)도 함께 버려진다. 실패하면 기기 목록은 남기고 "Couldn't load your saved list. / Try again" 알림을 띄운다.
- 저장·해제는 화면을 먼저 바꾸고, DB 요청은 하나씩 차례로 보낸다 (빠르게 두 번 눌러도 순서가 뒤집히지 않게). 실패하면 되돌리고 "Try again" 알림을 띄운다. **supabase-js 2.116은 읽기(GET) 요청이 네트워크 오류로 실패하면 1·2·4초 간격으로 다시 보낸다.** 그래서 저장 중에 하는 id 조회는 `.retry(false)`로 바로 실패시킨다. 목록 불러오기는 재시도를 그대로 둔다.
- 비공개로 바뀐 경험은 DB 행을 남기고, 목록을 읽을 때 경험 정보가 `null`로 와서 빠진다. 머리 숫자에서도 빠진다. `SavedList`의 자동 정리는 로그인하지 않은 사람에게만 돈다.
- 다른 기기나 탭에서 바뀐 계정 목록은 이 탭으로 돌아올 때(visibilitychange) 다시 읽는다. 실시간 반영(Realtime)은 넣지 않았다.
- 실행 취소는 다시 저장하는 방식이라, 계정 목록에서는 저장 시각이 바뀌어 목록 **맨 뒤로 간다**.
- 알림줄 부품 `Notice`를 새로 만들었다 (`components.md` §4-17, `/en/dev/ui`). 레이아웃에 하나만 두고 `src/lib/notice.ts`의 `showNotice()`로 띄운다. 문구는 `en.json` → `notice`.
- 로컬에서 확인한 것: 비로그인 3개 저장 → 가입 → 계정에 3개, 기기 목록 비워짐 / 목록·지역 상세·경험 상세에서 저장 → 머리 숫자·책갈피·저장 페이지 일치 / 다른 브라우저(새 컨텍스트)에서 같은 목록 / 계정에 이미 있는 것 1개 + 새것 1개를 합치면 중복 없이 1개만 늘어남 / Supabase 요청을 막고 저장·해제 → 되돌림 + 알림, "Try again"으로 복구 / 실행 취소 후 새로고침해도 유지 / 로그아웃 → 빈 기기 목록 / 다른 계정은 빈 목록. RLS는 SQL로도 확인했다: 남의 행은 안 보이고 지워지지 않으며(0건), 남의 `user_id`로 넣으면 거부되고, `anon`은 표에 접근할 수 없다. 비공개 전환은 롤백되는 트랜잭션에서 확인했다 (행은 남고 경험은 `null`). 폭 320px에서 알림줄에 가로 스크롤 없음. 테스트 계정 3개는 확인 후 지웠고, 저장 행도 cascade로 함께 지워졌다.
- advisors: 보안 경고 없음. 성능 INFO 2건(`saved_experiences_experience_id_idx`, `experiences_region_idx` 미사용)은 데이터가 적어서 생긴 것이라 그대로 둔다.
- 대시보드에서 바꿀 설정은 없다. 저장 페이지의 "Saved on this device" 문구는 로그인한 사람에게도 그대로 보인다. 4단계에서 고친다.

### 4단계 — 안내 문구·개인정보·마무리

**목표:** 화면의 설명이 실제 동작과 맞는다. **로그인 기능을 공개하는 배포에는 이 단계가 반드시 함께 들어가야 한다** (2·3단계만 먼저 배포하면 개인정보 페이지가 사실과 달라진다).

| 할 일 | 손대는 곳 |
|---|---|
| 개인정보 페이지: “계정을 요구하지 않고 이메일도 모으지 않는다”를 “계정은 선택이며, 만들면 이메일과 저장 목록을 보관한다” 취지로 수정 | `en.json` → `privacy` |
| 저장 페이지 안내: 로그인 여부에 따라 “이 기기에 저장” / “계정에 저장” 문구 전환. 로그인하지 않은 사람에게는 “로그인하면 다른 기기에서도 볼 수 있다”는 가벼운 안내 | `en.json` → `saved.device`, `saved/page.tsx` |
| 인수인계 §13 시나리오 전체 재확인 (로그인·비로그인 양쪽) | — |
| Supabase advisors 최종 점검 | — |

**진행 기록 (2026-09-23, 브랜치 `feat/privacy-copy-finish`)**
- §7 결정: 계정 삭제는 **문의로 처리**한다. 연락처는 `mondaylabs0132@gmail.com`이고, 개인정보 페이지 맨 아래에 `mailto` 링크로 적었다. 요청이 오면 Supabase 대시보드(Authentication → Users)에서 지운다. 저장 목록은 cascade로 함께 지워진다. 비밀번호를 잊은 경우도 같은 주소로 받는다 (§6).
- 개인정보 문구(`en.json` → `privacy`): 계정 없이 쓰면 이 브라우저에만 남는다는 것, 계정은 선택이고 만들면 이메일과 저장 목록을 보관한다는 것(이름은 묻지 않고, 비밀번호는 읽을 수 없는 형태로 저장)을 적었다. 로그인하면 이 기기 목록을 계정에 합친 뒤 비우고, 로그아웃하면 계정 목록이 이 기기에 남지 않으며, 로그인 유지에 쿠키를 쓴다는 것도 넣었다. 저장 위치가 Supabase라는 것, 비밀번호 재설정 기능이 없어 문의로 처리한다는 것, 계정 삭제 방법과 저장 목록이 함께 지워진다는 것도 적었다. 예전 문구의 "발 링크로 연락하라"는 발에 연락 수단이 없어 사실과 달랐다. 이번에 연락처로 바꿨다.
- 저장 페이지 안내: `saved.device`를 `guest`/`login`/`account` 세 문구로 나눴다. 새 클라이언트 부품 `src/app/[lang]/saved/SavedNote.tsx`가 `useAuth()`로 고른다. 비로그인이면 "Saved on this device…" 아래에 `Log in to see it on other devices` 링크(`ArrowLink` accent, `?next=` 현재 주소)를 보여 주고, 로그인이면 "Saved to your account…"를 보여 준다. 확인하는 동안에는 한 줄 높이만 잡아 두고 글은 비운다. 서버는 쿠키를 읽지 않으므로 `/en/saved`, `/en/privacy`는 계속 정적(○)으로 미리 만들어진다 (빌드 결과 확인).
- `structure.md`: 페이지 목록 7번 설명과 [6] 저장 조립도를 고치고, §1-2 "계정도 없다"를 "저장은 이 기기 또는 계정에 남는다"로 다시 썼다.
- 인수인계 §13 재확인 (로컬 `pnpm build && pnpm start`, 새 브라우저 컨텍스트):
  - 비로그인: 1) 첫 화면 Food 칩 → `?i=food`, 칩 선택됨, 4개. 2) 목록·서울 지역 상세·경험 상세에서 저장 → 머리 숫자·책갈피·저장 페이지 일치. 3) 상세 직접 진입 시 지역 안내·방문 안내 있음. 4) 상세 → 뒤로 가도 `?i=food`와 칩 유지. 5) 저장 페이지 View experience·View region guide 연결. 6) Remove → 알림 + Undo → 복구 → 새로고침 유지, 필터 결과 0개 안내. 7) 경험 10개 모두 외부 링크는 Google 지도뿐이고 예약 링크나 빈 링크(`#`)는 없다. 8) 사진 자리에는 "Photo —" 자리 표시가 보인다.
  - 로그인: 비로그인으로 2개 저장 → 저장 페이지 로그인 링크 → 가입 → `/en/saved`로 복귀, 안내가 계정 문구로 바뀌고 로그인 링크는 사라짐, 2개 합쳐지고 기기 목록 비워짐. 목록·강릉 지역 상세·경험 상세에서 저장 → 5개 일치. Supabase 요청을 막고 저장 → 되돌림 + 실패 알림. 다른 브라우저로 로그인하면 같은 5개. 로그아웃하면 빈 기기 목록 + 기기 문구. Remove → Undo → 전부 해제 → 새로고침 후 빈 상태.
  - 폭 320px: 저장(비로그인·로그인), 개인정보 페이지에서 가로 스크롤 없음.
- 테스트 계정 1개는 확인 후 SQL로 지웠다. 지우기 전에 저장 행을 하나 넣어 두었고, cascade로 함께 지워지는 것을 확인했다 (지금 `auth.users` 0명, `saved_experiences` 0행).
- advisors 최종: 보안 경고 없음. 2단계의 Leaked Password Protection 경고도 더 이상 나오지 않는다. 성능 INFO 2건(`saved_experiences_experience_id_idx`, `experiences_region_idx` 미사용)은 데이터가 적어서 생긴 것이라 그대로 둔다.
- 이번 범위 밖이라 고치지 않은 것: 필터 결과가 0개일 때 인수인계 §6.2의 "필터 초기화" 버튼이 없다 (안내 문구와 저장 목록 링크만 있다). `docs/design-system/index.md` §0-2의 "장소·경험 데이터: 샘플이다 (`src/data/*.sample.ts`)"는 1단계 이후 사실과 다르다. 콘텐츠·사진이 검증 전 샘플이라는 점(§13-8)은 콘텐츠 조사 단계의 일이다.
- **배포 전에 대시보드에서 직접 할 일:** (1) 배포 환경변수 `REVALIDATE_SECRET` (없으면 `/api/revalidate`가 500), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. (2) Supabase Database Webhook: `experiences`, `places`의 insert·update·delete → `POST https://<배포 주소>/api/revalidate`, 헤더 `x-revalidate-secret`. 지금은 설정되어 있지 않다 (public 표 트리거는 `set_updated_at`뿐). (3) 로그인 기능은 이 4단계와 함께 배포한다. (지금은 메일을 보내는 기능이 없어 Authentication → URL Configuration의 Site URL은 쓰이지 않는다. 비밀번호 재설정·이메일 인증을 넣을 때 배포 주소로 맞춘다.)

### 배포 — Vercel

**배포 진행 기록 (2026-09-23, 브랜치 `docs/deploy-check`)**
- 프로젝트: Vercel `developsoos-projects/korea-travel-finder`. GitHub `DevelopSoo/korea-travel-finder`와 연결되어 있고, main에 머지하면 production으로 배포된다. 주소는 **https://korea-travel-finder.vercel.app** 이다. 확인한 배포는 `dpl_5dgS76uLVLWsR5YiUyhARxQyMSc1`(main `92fc6e9` = PR #14 머지, 리전 iad1)다.
- 환경변수 (값은 적지 않는다. production·preview 둘 다, 모두 sensitive): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `REVALIDATE_SECRET`. `REVALIDATE_SECRET`을 새 값으로 바꾼 시각(08:11:36 UTC)보다 뒤인 08:12:13 UTC에 다시 배포되어, 새 값이 적용된 상태다. **환경변수를 바꾸면 다시 배포해야 적용된다.** `NEXT_PUBLIC_` 값은 빌드할 때 코드에 들어가기 때문이다. Vercel → Deployments → 최신 production → Redeploy로 다시 배포한다.
- 빌드 결과는 로컬 `pnpm build`와 같다. 정적(○): `/en`, `/en/places`, `/en/places/gangneung`·`seoul`, `/en/saved`, `/en/privacy`, `/en/dev/ui`, 경험 상세 일부. 부분 사전 렌더(◐): `/en/experiences`(`?i=`), `/en/login`, 나머지 경험 상세. 요청마다 새로 그리는 것(ƒ)은 `/api/revalidate`와 Proxy뿐이다.
- **Database Webhook은 보류했다.** 콘텐츠를 고칠 사람도, 고치는 일도 아직 적어서 최대 1시간 늦어도 문제가 없다. 웹훅을 걸면 대시보드에 비밀 값을 하나 더 두어야 하고, 실패해도 알려 주는 곳이 없다. 편집이 잦아지면 1단계 진행 기록의 값(`POST …/api/revalidate`, 헤더 `x-revalidate-secret`)으로 설정한다.
- **콘텐츠 반영:** 대시보드에서 `experiences`·`places`를 고치면 `cacheLife("hours")`에 따라 **최대 1시간 뒤** 사이트에 반영된다. 급할 때는 비밀 값을 넣어 직접 부른다. 비밀 값은 명령에 직접 적지 말고 입력받는다 (터미널 기록에 남지 않게):
  ```bash
  read -rs "S?REVALIDATE_SECRET: " && echo   # bash는 read -rsp "REVALIDATE_SECRET: " S
  curl -i -X POST https://korea-travel-finder.vercel.app/api/revalidate -H "x-revalidate-secret: $S"
  unset S
  ```
  `200 {"ok":true}`이 오면 캐시가 비워진 것이다. `'max'` 방식이라 바로 다음 요청에는 이전 내용이 나오고, 새로고침 한두 번 안에 바뀐다. `401`이 오면 비밀 값이 틀린 것이다. `500`이 오면 배포 환경변수에 `REVALIDATE_SECRET`이 없는 것이다.
- 배포 주소에서 확인한 것 (새 브라우저 컨텍스트, https):
  - `/api/revalidate`: 헤더 없이 POST → 401, 틀린 헤더 → 401, GET → 405. 500이 아니므로 `REVALIDATE_SECRET`이 들어가 있다.
  - 비로그인:
    - 첫 화면 Food 칩 → `?i=food`, 칩 선택, 4개. 들어온 직후 잠깐은 전체 목록이 보인다 (1단계의 `<Suspense>` 대기 화면. 로컬과 같다).
    - 목록·서울 지역 상세·경험 상세에서 저장 → 머리 숫자와 책갈피(`aria-pressed`)가 일치한다.
    - 상세 → 뒤로 가도 `?i=food`와 칩이 유지된다.
    - 저장 페이지: 기기 문구와 `Log in to see it on other devices`(`?next=%2Fen%2Fsaved`) 링크가 있다. View experience·View region guide가 연결된다. Remove → 알림 + Undo → 새로고침해도 유지된다.
    - 경험 10개 모두 외부 링크는 Google 지도뿐이다.
    - 개인정보 문구와 `mailto:mondaylabs0132@gmail.com` 링크가 4단계 내용과 같다.
  - 로그인:
    - 저장 페이지 로그인 링크 → 가입 → `/en/saved`로 돌아온다. 비로그인으로 저장한 3개가 계정에 합쳐지고, 기기 목록은 비워지고, 안내가 계정 문구로 바뀐다.
    - 새로고침해도 로그인이 유지된다.
    - 목록·강릉 지역 상세·경험 상세에서 저장하면 6개로 일치한다.
    - Supabase 요청을 막고 저장하면 숫자가 그대로이고 "Couldn't save that…" 알림이 뜬다.
    - 다른 브라우저 컨텍스트로 로그인하면 같은 6개가 보인다. 이미 계정에 있는 경험을 기기에 저장해 둔 채 로그인해도 중복이 생기지 않는다.
    - 로그아웃하면 보던 페이지에 그대로 머물고, 빈 기기 목록과 기기 문구가 보인다. 로그인 쿠키도 사라진다.
  - 폭 320px에서는 메인·목록·경험 상세·지역 목록·지역 상세·저장(비로그인·로그인)·개인정보·가입 화면 모두 가로 스크롤이 없다.
  - 배포의 production 로그에 오류가 없다 (확인한 시점에서 지난 1시간).
- 로컬과 다르게 동작한 곳은 없다. 참고로 로그인 쿠키(`sb-…-auth-token`)에는 https에서도 `Secure` 표시가 없다 (`SameSite=Lax`, 400일). `@supabase/ssr`의 기본값이라 로컬도 같고, 브라우저에서 로그인 상태를 읽어야 하므로 `HttpOnly`도 아니다.
- 테스트 계정 1개는 확인 후 SQL로 지웠다. 저장 행 6개도 cascade로 함께 지워졌다 (지금 `auth.users` 0명, `saved_experiences` 0행, 세션 0).
- advisors: 보안 경고 없음. 성능 INFO 2건(`saved_experiences_experience_id_idx`, `experiences_region_idx` 미사용)은 이전과 같아서 그대로 둔다.

### 임시 사진 — Unsplash

**목표:** 자리 표시 그라데이션을 Unsplash 사진으로 채운다. 사진 파일은 `public/`에 두지 않고, URL을 DB 칸에 둔다. 규칙은 `docs/design-system/photos.md` §3-6에 있다.

**진행 기록 (2026-09-23, 브랜치 `feat/unsplash-photos`)**
- 칸 추가 마이그레이션 `20260923084227_add_photo_urls_and_credits.sql`:
  - `experiences.image_credits` (jsonb 배열, `image_urls`와 같은 순서)
  - `places.hero_image_url`·`hero_image_credit`·`card_image_url`·`card_image_credit`
  - 출처 모양: `{author, author_url, source, source_url}`
  - 권한은 표 단위 `select`라 따로 주지 않았다. 칸만 추가했으므로 배포된 사이트는 영향을 받지 않는다.
- 사진 16장:
  - 경험 10, 지역 4 (강릉·서울의 큰 사진과 카드), 첫 화면 2 (`src/lib/homePhotos.ts`)
  - Unsplash 공식 API(Demo 키, `.env.local`의 `UNSPLASH_ACCESS_KEY`, 저장소에 넣지 않음)로 찾았다. 후보는 작게 받아서 직접 보고 골랐다.
  - 장소명으로 검색되는 사진을 먼저 썼다 (안목해변·강릉·을지로·인왕산 성곽·북촌). 없으면 한국의 비슷한 장면으로 채웠다.
  - 그래서 캡션의 장소와 다를 수 있다. 큰 사진에는 "Sample photo by … on Unsplash" 출처를 붙였다 (인수인계 §13-8).
- 이미지 로더: `next.config.ts` → `images.loaderFile = src/lib/imageLoader.ts`. Unsplash 주소에는 `w`·`q`·`auto=format`을 붙여 Unsplash 서버에서 바로 받는다. Unsplash가 요구하는 hotlink 방식이고, Vercel 이미지 변환 사용량이 들지 않는다.
- `PhotoFrame` 고침: 사진이 있으면 사진이 위에 얹은 글(첫 화면·지역 상세 제목과 버튼)을 가렸다. 사진이 없던 동안에는 드러나지 않던 문제다. 사진을 틀 안 맨 아래 층(`-z-10`, 틀은 `isolate`)으로 내렸다.
- **적용 순서 (지키지 않으면 배포 사이트의 사진이 깨진다):** DB는 로컬과 배포가 같이 쓴다. 지금 배포된 코드는 Unsplash 주소를 처리하지 못한다. 그래서 ① 이 PR을 머지해 배포 → ② 사진 데이터 마이그레이션 적용 → ③ `/api/revalidate` 호출(또는 최대 1시간 대기) 순서로 한다.

## 6. 이메일 인증을 끈 상태의 위험과 대응

| 위험 | 영향 | 지금의 대응 |
|---|---|---|
| 남의 이메일, 없는 이메일로 가입 가능 | 그 이메일 주인이 나중에 가입할 수 없음 | 초기 규모에서는 감수. 실제 사용자가 생기면 인증을 켜는 것을 다시 검토 |
| **비밀번호를 잊으면 복구하기 어려움** | 재설정 메일이 가긴 하지만, 주소가 확인된 적이 없어 본인이 받는다는 보장이 없음 | **확정: 첫 버전에는 재설정 기능을 넣지 않는다.** 이메일 인증을 켤 때 함께 넣는다. 그 전까지 문의로 처리 |
| Supabase 기본 메일 서버의 발송 한도가 낮음 | 재설정 메일 등이 막힐 수 있음 | 메일을 보내는 기능을 넣을 때 외부 메일 서버(SMTP) 연결을 함께 검토 |
| 가입 남용 (자동 가입) | 가짜 계정 누적 | Supabase 기본 속도 제한 유지. 문제가 보이면 캡차 추가 검토 |

저장 목록이라는 비교적 가벼운 데이터만 다루므로 위 위험은 초기에 감수할 수 있는 수준으로 본다. 개인 결제·예약 정보가 들어오기 전에는 반드시 이메일 인증을 켠다.

## 7. 아직 결정이 필요한 항목

(1·2단계를 막는 항목은 없다. 콘텐츠 반영 시점과 비밀번호 재설정은 2026-09-23 확정 → §1)

| 항목 | 선택지 | 권장 | 언제까지 |
|---|---|---|---|
| 계정 삭제 | 사이트 안 버튼 / 문의로 처리 | **확정 (2026-09-23): 문의로 처리.** `mondaylabs0132@gmail.com`, 개인정보 페이지에 명시 | 4단계 전 |
| 로그인 후 기기 목록 처리 | 합친 뒤 비움(기본값) / 그대로 둠 | 비움 — 공용 기기에서 목록이 섞이지 않게 | 3단계 시작 전 |
| 저장 해제 실행 취소 | 넣음 / 안 넣음 | 인수인계 §9.2 권고에 따라 넣되, 3단계 범위를 넘으면 별도 작업으로 분리 | 3단계 중 |

## 8. 이 계획에서 하지 않는 것

- 소셜 로그인, 매직링크, 전화번호 로그인
- 관리자 화면 (콘텐츠 수정은 Supabase 대시보드로)
- 사용자 프로필(이름·사진), 알림·이메일 발송
- 지역 저장, Stories, 후기, 개인화 추천
- 사진 파일을 Supabase Storage로 옮기는 일 (사진 확보 방식이 정해진 뒤 별도 계획)
