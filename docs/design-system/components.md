> 원본: 「Korea Experience Finder — 웹사이트 구조 & 디자인 시스템 v1」(2026-08-29) §4. 목차는 `index.md`.

## 4. 부품별 모양

Tailwind 이름은 §2 값을 `tailwind.config`에 등록했다고 가정하고 적는다.

### 4-1. 큰 버튼 (Primary)

```text
[         Find my Korea         ]   ← 폭: 화면 좌우 여백 뺀 전체
```

- 배경 `ink`, 글자 `paper`, 높이 52px, 글자 `text-body` 500, 모서리 4px
- 누른 상태: 배경 `#333330` (살짝 밝아짐). 커지거나 튀지 않는다
- 로딩(이메일 보낼 때): 글자만 `Sending…`으로 바뀜. 빙글빙글 도는 표시 없음
- 비활성: 배경 `line`, 글자 `ink-soft`
- 한 화면에 큰 버튼은 **하나만**

### 4-2. 보조 버튼 (Secondary)

```text
[ Open in Google Maps ↗ ]
```

- 배경 없음, 테두리 1px `line`, 글자 `ink`, 높이 44px
- 외부로 나가는 링크에는 끝에 ↗

### 4-3. 글자 링크

- 글자 `accent`, 밑줄 있음 (밑줄은 글자에서 2px 아래, 두께 1px)
- `Start over`, `←` 뒤로, Privacy 등

### 4-4. 선택 버튼 (Choice) — 질문 화면

```text
┌────────────────┐    ┌────────────────┐
│ Nature & quiet │    │ Nature & quiet │
└────────────────┘    └────────────────┘
   고르기 전              고른 후
   테두리 line            테두리 accent 2px
   배경 paper             배경 paper, 글자 accent
```

- 높이 56px, 2열, 사이 8px. 글자 `text-body`
- 고른 후에도 **배경은 흰색 그대로**. 파랗게 채우지 않는다 (채우면 앱 같아진다)
- 체크 아이콘 없음. 테두리 색과 두께로만 구분
- 최대 3개 고르는 질문에서 4번째를 누르면: 첫 번째 것이 풀린다 (오류 문구 없이)

### 4-5. 진행 표시

```text
←                    1 / 3
```

- 왼쪽 뒤로 화살표, 오른쪽 `1 / 3` Mono 글씨 `ink-soft`
- 점 세 개(● ○ ○)나 막대 바는 쓰지 않는다. 숫자로 충분하다

### 4-6. 사진 + 캡션

```text
┌─────────────────────┐
│                     │
│      (사진 4:5)      │
│                     │
└─────────────────────┘
Jumunjin, Gangneung · 05:40     ← 아래 8px, Mono, ink-soft
```

### 4-7. 경험 카드 (큰 것) — 결과 화면

```text
┌─────────────────────────┐
│ (사진 4:5)              │
│                         │
│ Jumunjin · 05:40        │ ← 캡션은 사진 안쪽 아래 왼쪽, 흰색
├─────────────────────────┤ ← 여기부터 흰 배경, 안쪽 여백 16px
│ GANGNEUNG               │ ← 뱃지
│ Jumunjin Fish Market    │ ← text-card
│ at Dawn                 │
│ Watch the day's catch   │ ← text-small, ink-soft
│ come in before tourists.│
│                         │
│ Why here, not Seoul     │ ← text-caption Mono, ink-soft
│ Seoul's markets open    │ ← text-small, ink
│ at 9. This one's done   │
│ by then.                │
│                         │
│ 1–2h   Low   ★★★☆☆ EN   │ ← text-caption Mono
└─────────────────────────┘
```

- 테두리 1px `line`, 모서리 4px, 그림자 없음
- 카드 전체가 눌린다. 누르면 테두리가 `ink`로 바뀜 (그 이상 없음)
- "Why here, not Seoul"은 소제목을 Mono로, 내용은 본문 폰트로 → 카드 안에서 눈에 띄는 유일한 자리

### 4-8. 경험 카드 (작은 것) — 관련 경험

```text
┌──────┐ ┌──────┐ ┌──────┐
│ 1:1  │ │ 1:1  │ │ 1:1  │
└──────┘ └──────┘ └──────┘
Anmok    Sheep    Ojukheon
Beach    Farm     House
```

- 가로로 3개, 화면 넘어가면 옆으로 넘기기
- 사진 + 이름(text-small)만. 설명 없음

### 4-9. 지역 뱃지

```text
GANGNEUNG
```

- 글자만. 배경도 테두리도 없음. `text-badge`, 전부 대문자, 자간 넓게, 색 `ink-soft`
- 알약 모양 색 배경 뱃지는 쓰지 않는다

### 4-10. ★ 점수

```text
★★★☆☆ EN     ← 영어 편한 정도
★★★★★ Local  ← 현지감
```

- 채운 별 `accent`, 빈 별 `line`. 크기 12px
- 별 뒤에 무엇에 대한 점수인지 Mono로 적는다. 별만 있으면 뭔지 모른다

### 4-11. 정보 표 — 상세 페이지

```text
Time       1–2 hours
───────────────────────
Price      Low
───────────────────────
Best       Dawn, any season
───────────────────────
English    ★★★☆☆
───────────────────────
Local      ★★★★★
───────────────────────
Booking    Not needed
```

- 왼쪽 이름 Mono `ink-soft`, 오른쪽 값 본문 `ink`. 줄 사이 1px `line`
- 표 바깥 테두리 없음. 아이콘 없음

### 4-12. 태그

```text
Good for:  nature  slow  sea
```

- Mono, `ink-soft`. 태그 사이 8px. 배경·테두리 없음
- 이번 버전에서는 눌리지 않는다 (누르면 태그별 목록이 나와야 하는데 그 페이지는 없다)

### 4-13. 이메일 입력 칸

```text
┌───────────────────────────────┐
│ Want this list in your inbox? │ ← text-card
│ We'll add a few extras.       │ ← text-small ink-soft
│ ┌───────────────────────────┐ │
│ │ you@email.com             │ │ ← 높이 48px, 테두리 line
│ └───────────────────────────┘ │
│ [       Send my list        ] │ ← 큰 버튼
│ No spam. Unsubscribe anytime. │ ← text-caption
└───────────────────────────────┘
```

- 박스 테두리 1px `line`. 배경 흰색 (회색 상자 안에 넣지 않는다)
- 입력 중: 테두리 `accent`
- 형식 오류: 테두리 `#B4382A`, 아래 `Please check your email.` (빨간 글씨, text-small). 이 빨강은 오류에만 쓰고 다른 데는 안 쓴다
- 보낸 후: 박스 내용이 통째로 `Sent! Check your inbox.` 한 줄로 바뀜. 초록 체크 표시, 축하 애니메이션 없음

### 4-14. 빈 상태 / 오류

| 상황             | 문구                                    | 아래 버튼        |
| ---------------- | --------------------------------------- | ---------------- |
| 결과 0개         | `Nothing matched yet. Try fewer picks.` | Start over       |
| 404              | `This experience isn't here yet.`       | Find your Korea  |
| 이메일 발송 실패 | `Couldn't send. Try once more.`         | (입력 칸 그대로) |

- 그림·일러스트 없음. 글 두 줄과 버튼 하나

---

