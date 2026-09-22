> 디자인 시스템 v2. 목차는 `index.md`. 실물은 `/en/dev/ui` 에서 한 화면에 볼 수 있다 (개발 환경에서만 열린다).

## 4. 부품

전부 `src/components/ui/` 에 있다. 화면 파일 안에서 새 부품을 만들지 않는다.

| §    | 파일                                  | 한 줄                                     |
| ---- | ------------------------------------- | ----------------------------------------- |
| 4-1  | `PhotoFrame.tsx`                      | 사진 + 캡션. 사진이 없으면 그라데이션     |
| 4-2  | `Eyebrow.tsx` · `SectionHeading.tsx`  | 눈썹 글자, 구역 제목 묶음                 |
| 4-3  | `ButtonPrimary.tsx` · `ButtonSecondary.tsx` | 큰 버튼, 보조 버튼                  |
| 4-4  | `ArrowLink.tsx`                       | 화살표 링크                               |
| 4-5  | `FilterChip.tsx` · `ChipLink.tsx`     | 알약 필터, 알약 링크                      |
| 4-6  | `BookmarkButton.tsx` · `SaveButton.tsx` | 사진 위 저장 단추, 글자 있는 저장 버튼  |
| 4-7  | `Breadcrumb.tsx`                      | 길 표시                                   |
| 4-8  | `Tag.tsx`                             | 태그 알약 (누를 수 없다)                  |
| 4-9  | `FactGrid.tsx`                        | 아이콘 + 두 줄 정보 칸                    |
| 4-10 | `DaySteps.tsx`                        | 번호로 잇는 하루 흐름                     |
| 4-11 | `CtaBand.tsx`                         | 페이지 끝 밴드                            |
| 4-12 | `EmptyState.tsx`                      | 빈 상태                                   |
| 4-13 | `Select.tsx`                          | 드롭다운                                  |
| 4-14 | `ExperienceCard.tsx` · `ExperienceCardWide.tsx` | 경험 카드 (세로형 / 넓은형)     |
| 4-15 | `PlaceCard.tsx`                       | 장소 카드                                 |
| —    | `icons.tsx`                           | 선 아이콘 모음                            |

카드가 받는 값은 `src/lib/cards.ts` 의 `CardItem` 하나로 맞춰 둔다.
부품은 `Experience` 전체를 알지 않는다 — 부품 모음 화면에서도 같은 모양으로 쓰기 위해서다.

---

### 4-1. PhotoFrame

- 비율: `card`(1:0.86) · `4:5` · `3:2` · `16:9` · `1:1` · `fill`(부모 높이를 채운다).
- 캡션은 사진 **안** 아래에 10px 대문자로 늘 붙는다. `Photo — {캡션}` 형태다.
- `src` 가 없으면 자리 표시 그라데이션이 깔린다 (photos.md §3-5). 이때 `role="img"` + `aria-label` 로 캡션을 읽어 준다.
- 사진 위에 얹을 것(저장 단추, 제목)은 `children` 으로 넣는다.
- **반투명 막을 씌우지 않는다.** 글자가 안 읽히면 사진을 바꾼다.

### 4-2. Eyebrow · SectionHeading

- `Eyebrow` 는 제목 위 작은 대문자 한 줄. `tight`(자간 0.14em, 카드 분류)와 `wide`(0.2em, 구역 안내말) 두 가지.
- 색은 `mute`(기본) / `accent`(상세 페이지 지역·분류) / `on-photo`(사진 위).
- `SectionHeading` 은 `eyebrow + 제목 + lead + 오른쪽 링크` 묶음. `align="center"` 로 가운데 정렬.
- 제목 오른쪽에 링크를 붙일 때는 `action` 에 `ArrowLink` 를 넣는다.

### 4-3. ButtonPrimary · ButtonSecondary

| 상태        | ButtonPrimary                     | ButtonSecondary                |
| ----------- | --------------------------------- | ------------------------------ |
| 기본        | `accent` 배경 + 흰 글자           | 테두리 `line-strong` + 먹 글자 |
| 올림·눌림   | `accent-press` 배경               | 테두리만 `ink` 로 진해진다     |
| 못 누름     | `line-strong` 배경 + `paper` 글자 | —                              |
| 켜짐(저장됨) | —                                | `accent-soft` 배경이 찬다      |

- 크기는 하나뿐이다: `px-[22px] py-3`, 글자 14px/600, 모서리 6px.
- `tone="paper"` 는 **사진 위에 놓을 때만** 쓴다. 그린 버튼은 어두운 사진 위에서 묻힌다.
- `pill` 은 저장 페이지 밴드에서만. `arrow` 로 끝에 화살표를 붙인다.
- 커지거나 떠오르거나 그림자가 생기지 않는다.

### 4-4. ArrowLink

이 사이트의 "더 보기"는 전부 이 모양이다. 버튼처럼 보이는 링크를 따로 만들지 않는다.

- `underline`(기본): 글자 밑 1.5px 밑줄. 구역 제목 옆, 카드 안.
- `plain`: 밑줄 없음. 마우스를 올리면 `ink-mute` 로 흐려진다.
- `accent`: 글자색이 `accent-press`. 저장·밴드 안에서 쓴다.

### 4-5. FilterChip · ChipLink

- `FilterChip` 은 고를 수 있는 알약. 고른 것은 **먹색으로 꽉 찬다**(배경 `ink`, 글자 `paper`).
- 한 줄에서 고를 수 있는 건 하나뿐이다. 같은 것을 다시 누르면 풀린다.
- 크기 `lg`(첫 화면) / `md`(경험 목록) / `sm`(장소 안내·저장).
- `ChipLink` 는 고르는 게 아니라 **옮겨 가는** 알약이다. 첫 화면 취향 칩이 이것이다 — 누르면 `?i=…` 로 걸러진 목록으로 간다.

### 4-6. BookmarkButton · SaveButton

- `BookmarkButton` 은 사진 위 오른쪽 위에 얹는 작은 단추. 카드 전체가 링크인 자리에서도 저장만 되도록 `preventDefault` + `stopPropagation` 한다.
  - `on-photo-dark`(기본): `ink/30` 배경, 모서리 4px. 어두운 사진 위.
  - `on-photo-light`: 흰 배경 85%, 원형. 밝은 사진·넓은 카드 위.
- `SaveButton` 은 글자가 있는 큰 것. 상세 페이지와 밴드에 쓴다.
- 저장된 상태는 **책갈피 속이 채워지는 것**으로만 알린다. 글자가 늘어나거나 색이 요란해지지 않는다.
- 두 부품 모두 `aria-pressed` 를 단다.

### 4-7. Breadcrumb

- `plain`(기본) / `banded`(옅은 `paper-3` 띠 — 장소 안내에서만).
- 마지막 칸은 링크가 아니다. 색이 `ink` 로 진해진다.
- 첫 칸은 사이트 이름이다. "Home" 이라고 쓰지 않는다.

### 4-8. Tag

- 누를 수 없다. 분류를 보여 주기만 한다.
- `accent-soft-2` 배경, 12px, 알약. 상세 페이지 오른쪽 상자에만 쓴다.

### 4-9. FactGrid

- 표가 아니라 `아이콘 + 제목 + 한 줄` 칸을 나란히 놓는다 (`<dl>`).
- `boxed`(기본): `paper-3` 배경, 사진 바로 밑에 붙는다(위 모서리 0).
- `plain`: 배경 없이. 이미 상자 안일 때.
- 칸 사이는 세로선 1px. **마지막 칸 뒤에는 선이 없다.** 폰에서는 선이 사라지고 세로로 쌓인다.

### 4-10. DaySteps

- 번호 동그라미(`accent` 배경)를 세로선으로 잇는다. 마지막 칸 밑에는 선이 없다.
- `<ol>` 이다. 번호는 CSS 가 아니라 순서대로 찍는다.

### 4-11. CtaBand

- 페이지 끝에서 **다음 걸음을 하나만** 권한다. 한 페이지에 하나만 쓴다.
- `soft`(기본, `accent-soft`) / `paper`(`paper-2`).
- 오른쪽 `action` 에는 `ArrowLink` 나 버튼 하나를 넣는다.

### 4-12. EmptyState

- 한 줄(Serif 20px, `ink-soft`)과 다음 걸음 하나뿐이다.
- **그림·이모지·일러스트를 넣지 않는다.**

### 4-13. Select

- 라벨은 왼쪽에 굵게 붙여 쓴다 (`Region:`).
- 테두리 `line-strong`, 배경 `surface`, 모서리 5px.
- 기본 `<select>` 를 그대로 쓴다. 직접 만든 드롭다운을 쓰지 않는다.

### 4-14. ExperienceCard · ExperienceCardWide

둘 다 **테두리가 없다.** 사진이 카드의 경계다. 높이를 고정하지 않는다 — 글 길이만큼 늘어난다.

| 항목      | ExperienceCard           | ExperienceCardWide             |
| --------- | ------------------------ | ------------------------------ |
| 사진 비율 | `card` (1:0.86)          | `16:9`                         |
| 저장 단추 | 어두운 형(모서리)        | 밝은 형(원형)                  |
| 눈썹      | 분류 (+ `showRegion` 이면 지역 \| 분류) | 분류만          |
| 쓰는 자리 | 경험 목록, 장소 안내     | 상세의 "근처", 저장 목록       |

`ExperienceCardWide` 는 `saveMark`·`footer` 로 아래쪽을 갈아 끼울 수 있다 — 저장 페이지가 이걸로 "Remove" 를 붙인다.

### 4-15. PlaceCard

- 첫 화면과 장소 목록에만 쓴다.
- **카드 전체가 링크다.** 사진 위에 단추를 얹지 않는다.
- 모서리 2px — 카드 중에 가장 각졌다. 장소는 "사진 그 자체"에 가깝다.
