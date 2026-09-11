# 웹사이트 구조 & 디자인 시스템 — 단계별 구축 계획

> 작성: 2026-09-11 · 기준 문서: `docs/design-system/*.md` (v1), `docs/product/index.md` (PRD v1)
> 이 계획은 PRD "1주차 뼈대 + 2주차 화면 4장" 중 **보이는 부분**만 다룬다.
> 제외: Supabase 저장, 추천 규칙, 이메일 발송, SEO·사이트맵. (PRD §9 1·3주차, 다음 계획에서)

## 사용법

- 한 세션에 **한 단계만** 진행한다. "N단계 진행해"라고 요청하면 그 단계의 "읽을 문서"만 읽고 시작한다.
- 각 단계 끝의 "완료 확인"을 통과해야 다음 단계로 간다. 통과하면 아래 진행표의 상태를 `✅`로 바꾼다.
- 문서에 없는 값·케이스를 만나면 임의로 만들지 말고 사용자에게 한 줄로 확인한다. (`.claude/skills/design-system` 규칙)
- 코드를 쓰기 전에 `node_modules/next/dist/docs/01-app/` 에서 해당 단계가 가리키는 가이드를 먼저 읽는다. 이 Next.js 는 학습 데이터와 다르다(`AGENTS.md`).

## 진행표

| 단계 | 이름                         | 상태 | 의존   |
| ---- | ---------------------------- | ---- | ------ |
| 0    | 디자인 문서 분리             | ✅   | —      |
| 1    | 토큰 → `globals.css`, 폰트   | ✅   | 0      |
| 2    | `/en` 라우트 뼈대, 머리·발   | ✅   | 1      |
| 3    | 기본 부품 6개                | ✅   | 1      |
| 4    | 사진·카드 부품 5개           | ⬜   | 3      |
| 5    | 폼·상태 부품 3개             | ⬜   | 3      |
| 6    | 페이지 6장 조립 (임시 데이터) | ⬜   | 2·4·5  |
| 7    | 부품 모음 화면 + 금지 목록 점검 | ⬜ | 6      |

---

## 0단계 — 디자인 문서 분리 ✅

원본 688줄 `index.md` 를 `structure / tokens / photos / components / patterns` 5개 파일로 나누고 `index.md` 는 목차·방향·미결 사항만 남겼다. (2026-09-11 완료)

---

## 1단계 — 토큰을 `globals.css` 에 옮기고 폰트 3종 로드 ✅

**읽을 문서**
- `docs/design-system/tokens.md` 전체
- Next 가이드: `01-getting-started/11-css.md`, `01-getting-started/13-fonts.md`

**할 일**
1. `src/app/layout.tsx`: Geist 2종을 지우고 `next/font/google` 로 **Bricolage Grotesque**, **IBM Plex Sans**, **IBM Plex Mono** 를 CSS 변수(`--font-display`, `--font-sans`, `--font-mono`)로 로드. `metadata` 의 "Create Next App" 문구 제거(임시 제목: `Korea Experience Finder`).
2. `src/app/globals.css`: `@theme` 블록에 아래를 등록하고, 다크 모드 `@media` 블록과 `Arial` 폰트 선언을 삭제.
   - 색 `--color-paper / ink / ink-soft / line / accent / error` (값은 tokens.md §6)
   - 폰트 `--font-display / sans / mono`
   - 글자 `--text-display … --text-badge` 7단계 + 각각의 줄 간격
   - 여백 `--spacing-xs … --spacing-2xl` 6단계 (기본 4px 스케일 위에 이름만 추가)
   - 모서리 `--radius-sm 2px`, `--radius-md 4px`
   - 내용 최대 폭 `--container-content 640px`
3. `body` 기본값: 배경 `paper`, 글자 `ink`, 폰트 `sans`, 크기 `body`.
4. `src/app/page.tsx` 의 생성 기본 내용은 비우고 토큰이 보이는 임시 문구 한 줄만 둔다(2단계에서 `/en` 으로 이동시킴).

**만들거나 고칠 파일**: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

**완료 확인**
- `pnpm build` 통과.
- `pnpm dev` 로 열었을 때 배경 순백, 글자 먹색, 다크 모드로 바꿔도 색이 안 변한다.
- 개발자 도구에서 `text-display` `bg-accent` `p-md` `max-w-content` 클래스가 실제 값(40/44px, #1F4E5F, 16px, 640px)으로 나온다.

**금지**: 하드코딩 색상값·임의 px, 다크 모드, 그림자 토큰(첫 화면 글자 그림자는 6단계에서 인라인 예외로만).

---

## 2단계 — `/en` 라우트 뼈대와 머리(Header)·발(Footer) ✅

**읽을 문서**
- `docs/design-system/structure.md` §1-1, §1-2, §1-3 의 "세 층" 그림
- `docs/design-system/tokens.md` §2-3 여백, §2-4 구분선
- Next 가이드: `01-getting-started/02-project-structure.md`, `03-layouts-and-pages.md`, `04-linking-and-navigating.md`, `02-guides/internationalization.md`(라우트 세그먼트 부분만), `02-guides/redirecting.md`

**할 일**
1. `src/app/[lang]/layout.tsx` 생성. `lang` 은 이번 버전에서 `en` 만 허용(`generateStaticParams`). 머리·몸통·발 세 층 구조. 몸통은 `max-w-content mx-auto px-md`.
2. `/` → `/en` 리다이렉트 (`next.config.ts` `redirects` 또는 `src/app/page.tsx` 에서 `redirect`). 가이드 확인 후 한 가지만 택한다.
3. `src/components/layout/Header.tsx`: 높이 56px, 흰 배경, 왼쪽 글자 로고(임시 텍스트 `Korea Experience Finder` — 미결 1번), 오른쪽 `EN`. 아래 구분선 없음(문서에 없다).
4. `src/components/layout/Footer.tsx`: 글자 링크 3개 한 줄(Instagram · TikTok · Privacy), 위쪽 1px `line` 구분선. 링크 주소는 `#` 임시.
5. `src/app/[lang]/page.tsx` 는 빈 몸통(3단계 이후 채움). `src/app/[lang]/not-found.tsx` 자리만 만든다.
6. 문장은 `src/messages/en.json` 에 모은다(PRD §8 다국어 준비). 머리·발 문구부터 넣기 시작.

**만들거나 고칠 파일**: `src/app/[lang]/layout.tsx`, `src/app/[lang]/page.tsx`, `src/app/[lang]/not-found.tsx`, `src/app/page.tsx`(리다이렉트), `src/components/layout/Header.tsx`, `Footer.tsx`, `src/messages/en.json`

**완료 확인**
- `/` 접속 → `/en` 으로 이동. `/en` 에 머리·발이 보이고 몸통이 폰 폭에서 좌우 16px, PC에서 640px 가운데 정렬.
- `/ko` 접속 → 404.
- 머리에 아이콘·원형 로고 없음(patterns.md 23번).

---

## 3단계 — 기본 부품 6개 ✅

**읽을 문서**
- `docs/design-system/components.md` §4-1 ~ §4-5, §4-9
- `docs/design-system/tokens.md` §2-2 굵기·자간 규칙
- Next 가이드: `01-getting-started/05-server-and-client-components.md`

**할 일** — 모두 `src/components/ui/` 아래. 상태(눌림·비활성·로딩)는 문서에 적힌 것만.

| 파일               | 문서   | 핵심 규칙                                                                     |
| ------------------ | ------ | ----------------------------------------------------------------------------- |
| `ButtonPrimary.tsx`| §4-1   | 높이 52px, `ink` 배경, `paper` 글자, 눌림 `#333330`(문서 명시값 → 토큰 `ink-press` 로 추가), `loading` 이면 글자만 `Sending…` |
| `ButtonSecondary.tsx`| §4-2 | 높이 44px, 테두리 `line`, `external` 이면 끝에 ↗                                |
| `TextLink.tsx`     | §4-3   | `accent`, 밑줄 offset 2px 두께 1px. `next/link` 감싼다                      |
| `ChoiceButton.tsx` | §4-4   | 높이 56px, 선택 시 테두리 `accent` 2px + 글자 `accent`, **배경은 흰색 유지**, 체크 아이콘 없음 |
| `Progress.tsx`     | §4-5   | 왼쪽 ← (TextLink), 오른쪽 `1 / 3` Mono `ink-soft`. 점·막대 금지                 |
| `RegionBadge.tsx`  | §4-9   | 글자만, `text-badge`, 대문자, 자간 0.08em, `ink-soft`. 배경·테두리 없음          |

- `ChoiceButton` 만 클라이언트 컴포넌트가 필요할 수 있다. 선택 상태는 부모(질문 화면)가 갖고 부품은 `selected` 프롭만 받는다.
- 아이콘은 ←, ↗ 두 글자를 텍스트로 쓴다. 아이콘 라이브러리 설치 금지.

**완료 확인**
- 6개 부품이 프롭만으로 모든 문서 상태를 표현한다(디자인 문서에 없는 프롭·변형 없음).
- 굵기는 400·500·600 만 사용. 모서리는 4px(뱃지 없음).
- `pnpm lint`, `pnpm build` 통과.

---

## 4단계 — 사진·카드 부품 5개

**읽을 문서**
- `docs/design-system/photos.md` 전체(캡션 형식, 비율, 로딩 중 회색 네모)
- `docs/design-system/components.md` §4-6, §4-7, §4-8, §4-10, §4-12
- `docs/product/index.md` §6 표 1 `experiences` (카드에 들어갈 필드 이름 맞추기)
- Next 가이드: `01-getting-started/12-images.md`

**할 일**

| 파일                  | 문서    | 핵심 규칙                                                                 |
| --------------------- | ------- | ------------------------------------------------------------------------- |
| `Photo.tsx`           | §4-6, §3| `next/image` + `object-cover`, 비율 프롭 `4:5 | 3:2 | 1:1 | full`, 로딩 배경 `line`, 흐림·반짝임 금지. 캡션은 `장소 · 시간` 형식 문자열 하나로 받고 `alt` 에 그대로 쓴다. `captionPosition: below | overlay`(overlay 는 흰색) |
| `Stars.tsx`           | §4-10   | 채운 별 `accent`, 빈 별 `line`, 12px, 뒤에 Mono 라벨 필수(`EN`, `Local`) |
| `Tags.tsx`            | §4-12   | `Good for:` + Mono 태그, 간격 8px, 눌리지 않음                             |
| `ExperienceCard.tsx`  | §4-7    | 세로: 사진 4:5(캡션 overlay) → 뱃지 → 이름 `text-card` → 한 줄 설명 → `Why here, not Seoul`(Mono 소제목 + 본문) → 정보 3개 Mono(`1–2h · Low · ★★★☆☆ EN`). 테두리 `line`, 눌림 시 테두리 `ink`. 카드 전체가 링크 |
| `ExperienceCardSmall.tsx` | §4-8 | 1:1 사진 + 이름만. 3개 가로, 넘치면 가로 스크롤(부모가 담당)              |

- 카드 데이터 타입은 `src/lib/types.ts` 에 `Experience` 로 정의하되 PRD 표 1 필드명(`slug`, `name_en`, `region`, `time_min/max`, `price`, `english_level`, `local_level`, `photo_caption` …)을 그대로 쓴다. 필드명이 PRD 에 없으면 확인.
- 임시 사진: `public/photos/` 에 `.webp` 2~3장(폭 1200px). 없으면 `line` 색 빈 네모로 대체하고 캡션만 넣는다. **AI 생성·스톡 미소 모델 사진 금지.**

**완료 확인**
- 카드 높이가 글 길이에 따라 달라진다(같은 높이로 자르지 않음, patterns.md 24번).
- 사진 위 반투명 막 없음. 마우스 올려도 커지거나 떠오르지 않음.
- 모든 `<img>` 의 `alt` = 캡션 문자열.

---

## 5단계 — 폼·상태 부품 3개

**읽을 문서**
- `docs/design-system/components.md` §4-11, §4-13, §4-14
- `docs/product/index.md` §4 [3] 결과 화면의 이메일 관련 요구사항
- Next 가이드: `02-guides/forms.md`(화면 상태만, 실제 전송은 다음 계획)

**할 일**

| 파일              | 문서   | 핵심 규칙                                                                                   |
| ----------------- | ------ | ------------------------------------------------------------------------------------------- |
| `InfoTable.tsx`   | §4-11  | 이름 Mono `ink-soft` / 값 `ink`, 줄 사이 1px `line`, 바깥 테두리·아이콘 없음. 값에 `Stars` 넣을 수 있음 |
| `EmailBox.tsx`    | §4-13  | 상태 4개: `idle`(테두리 `line`) · `focus`(`accent`) · `error`(`error` 색 + `Please check your email.`) · `sent`(박스 내용이 `Sent! Check your inbox.` 한 줄로 교체). 전송 함수는 프롭으로 받고 이번 단계는 가짜 함수 |
| `EmptyState.tsx`  | §4-14  | 문구 두 줄 + 버튼 하나. 문구 3종은 `en.json` 에서. 그림·일러스트 없음                         |

**완료 확인**
- `EmailBox` 의 4상태를 프롭으로 강제 전환해 볼 수 있다. 초록 체크·축하 애니메이션 없음.
- `error` 색은 이 부품 외 어디에도 쓰이지 않는다(`grep` 으로 확인).

---

## 6단계 — 페이지 6장 조립 (임시 데이터)

**읽을 문서**
- `docs/design-system/structure.md` §1-1 ~ §1-3 전체
- `docs/product/index.md` §4 화면별 상세 [1]~[4] (문구·질문·선택지 원문), §8 다국어
- Next 가이드: `01-getting-started/03-layouts-and-pages.md`(동적 세그먼트, `searchParams`), `10-error-handling.md`(not-found), `14-metadata-and-og-images.md`

**할 일** — 데이터는 `src/data/experiences.sample.ts` 에 PRD 표 1 형식으로 **10개**(강릉 6 + 서울 4, PRD 1주차 기준) 손으로 넣는다. 추천 규칙은 넣지 않고 결과 화면은 샘플 전체(최대 8개)를 그대로 보여 준다.

| 주소                          | 파일                                   | 조립 규칙(structure.md 그림 순서대로)                                                    |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `/en`                         | `[lang]/page.tsx`                      | 전체 높이 사진 + 아래 1/3 지점 흰 글씨 3줄 + Primary 버튼 + `Takes 20 seconds. No sign-up.` + 캡션. 글자 그림자 `0 1px 2px rgba(0,0,0,0.3)` 만 예외 허용. 반투명 막 금지 |
| `/en/find`                    | `[lang]/find/page.tsx` + 클라이언트 컴포넌트 | 한 화면에 질문 하나, Progress, ChoiceButton 2열 간격 8px. 질문 1은 최대 3개(4번째 누르면 첫 번째 해제), `Next` 버튼 질문 1에만. 질문 2·3은 누르면 바로 다음. 마지막 답 → `/en/results?i=…&v=…&s=…` |
| `/en/results`                 | `[lang]/results/page.tsx`              | `Your Korea` 제목 + 고른 것 요약 → 카드 1열 세로 → EmailBox → `Start over` 링크. 카드 0개면 EmptyState |
| `/en/experiences/[slug]`      | `[lang]/experiences/[slug]/page.tsx`   | 사진 4:5 + 캡션 → 뱃지 → 제목 → 소개 글 → `Why here, not Seoul` → InfoTable → How to get there + Secondary(↗ Maps) → Tags → (쇼츠 있으면 Secondary) → 작은 카드 3개 → Primary `Find your Korea`. `generateMetadata` 로 제목·설명 |
| `/en/privacy`                 | `[lang]/privacy/page.tsx`              | 글만. 내용은 임시 문단(PRD 미결 확인 후 교체)                                             |
| 없는 slug                     | `[lang]/not-found.tsx`                 | EmptyState(`This experience isn't here yet.` + `Find your Korea`)                         |

- 질문 문구·선택지·URL 파라미터 값(`i`, `v`, `s`)은 PRD §4 [2] 원문을 그대로 쓴다. PRD 에 없으면 확인.
- 모든 화면 문장은 `en.json` 에서 읽는다. 화면에 `AI` 라는 단어 금지(patterns.md 20번).
- 폰 화면(390px) 기준으로 만들고 PC 는 640px 가운데 정렬만.

**완료 확인**
- 첫 화면 → 질문 3번 → 결과 → 카드 → 상세 → `Find your Korea` → 질문 화면까지 끊김 없이 이어진다.
- 결과 화면 새로고침 시 주소의 답이 유지된다.
- `/en/experiences/없는-slug` → 404 화면. `pnpm build` 통과.

---

## 7단계 — 부품 모음 화면 + 금지 목록 점검

**읽을 문서**
- `docs/design-system/patterns.md` 전체(24개 표 + 자체 점검 3문항)
- `docs/design-system/index.md` §7 미결 사항

**할 일**
1. `src/app/[lang]/_ui/page.tsx`(개발 전용, 프로덕션 빌드 제외 여부는 가이드 확인) 에 부품 16개를 상태별로 모두 나열.
2. 폰 폭 스크린샷을 찍어 patterns.md 24개 항목을 하나씩 대조하고 결과를 이 문서 아래 "점검 기록" 에 표로 남긴다.
3. 자체 점검 3문항에 답을 적는다("사진을 빼면 뭐가 남나" 등).
4. 미결 2번(쪽빛이 강릉 사진과 겹칠 때) 을 실제 사진 위에서 확인하고 결과만 기록. 색을 바꾸는 결정은 사용자에게.

**완료 확인**
- 24개 항목 중 위반 0. 위반이 있으면 해당 단계로 돌아가 고치고 다시 기록.

**점검 기록**: (7단계 수행 시 채운다)

---

## 파일 배치 요약

```text
src/
  app/
    page.tsx                 → /en 리다이렉트
    layout.tsx               → 폰트·globals.css
    globals.css              → @theme 토큰
    [lang]/
      layout.tsx             → Header · 몸통(640px) · Footer
      page.tsx               → [1] 첫 화면
      not-found.tsx          → [6] 404
      find/page.tsx          → [2] 질문
      results/page.tsx       → [3] 결과
      experiences/[slug]/page.tsx → [4] 상세
      privacy/page.tsx       → [5] 개인정보
      _ui/page.tsx           → 부품 모음(개발용)
  components/
    layout/  Header.tsx Footer.tsx
    ui/      ButtonPrimary ButtonSecondary TextLink ChoiceButton Progress RegionBadge
             Photo Stars Tags ExperienceCard ExperienceCardSmall
             InfoTable EmailBox EmptyState
  data/      experiences.sample.ts
  lib/       types.ts
  messages/  en.json
```

## 이 계획에서 정하지 않은 것 (미결, 그대로 둠)

- 로고 폰트·사이트 이름 (design §7-1, PRD 미결) → 임시 텍스트 로고
- 강조색 대체 여부 (design §7-2) → 7단계에서 확인만
- 첫 화면 사진 고정 1장 (design §7-3) → 고정
- 캡션 시간 표기 24시간 (design §7-5) → 24시간
