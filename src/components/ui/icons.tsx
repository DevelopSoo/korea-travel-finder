// 선 아이콘 모음 (tokens.md §2-5). 이모지는 쓰지 않는다.
// 굵기 1.5, 선 끝은 둥글게. 색은 언제나 currentColor.

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// 오른쪽 화살표 — 링크와 버튼 끝에 붙는다
export function ArrowRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 18 12"
      className={className ?? "h-3 w-[18px] shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.6}
    >
      <path d="M1 6h15M11.5 1.5L16.5 6l-5 4.5" />
    </svg>
  );
}

// 책갈피 — 저장 표시. filled 면 속을 채운다
export function Bookmark({
  className,
  filled,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 18"
      className={className ?? "h-[18px] w-4 shrink-0"}
      aria-hidden="true"
      {...stroke}
      fill={filled ? "currentColor" : "none"}
    >
      <path d="M2 1h12v16l-6-4.5L2 17V1z" />
    </svg>
  );
}

export function Share({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 18"
      className={className ?? "h-4 w-[17px] shrink-0"}
      aria-hidden="true"
      {...stroke}
    >
      <path d="M13 5l5-4v9M18 10c0 4-3.5 7-8 7s-8-3-8-7 3.5-7 8-7c1 0 2 .15 2.9.45" />
    </svg>
  );
}

export function Train({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 20"
      className={className ?? "h-5 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
    >
      <path d="M4 2h16v12H4zM1 17h22M9 17v-3m6 3v-3" />
    </svg>
  );
}

export function Calendar({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M4 6h16v15H4zM4 10h16M9 3v4m6-4v4" />
    </svg>
  );
}

export function Compass({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.5 2" />
    </svg>
  );
}

export function Coins({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M9 11a6 3 0 100-6 6 3 0 000 6zM3 8v5c0 1.66 2.69 3 6 3s6-1.34 6-3V8M9 16v3c0 1.66 2.69 3 6 3s6-1.34 6-3v-5c0-1.66-2.69-3-6-3" />
    </svg>
  );
}

export function Sun({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Ticket({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6 shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M3 8V6h18v2a2 2 0 000 4v2H3v-2a2 2 0 000-4zM10 6v10" />
    </svg>
  );
}

export function Note({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 18"
      className={className ?? "h-[17px] w-[15px] shrink-0"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.3}
    >
      <path d="M3 1h8l3 3v13H3V1zM11 1v3h3M6 8h5M6 11h5M6 14h3" />
    </svg>
  );
}

// 취향 칩 아이콘 — 첫 화면. interest_tags 값과 이름이 같다
export const interestIcons: Record<string, (p: IconProps) => React.ReactNode> = {
  food: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M4 12h16M5 12c0 4 3 7 7 7s7-3 7-7M9 12V7m3 5V5m3 7V8" />
    </svg>
  ),
  history: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M3 10h18M5 10l7-6 7 6M6 10v8m4-8v8m4-8v8m4-8v8M4 18h16" />
    </svg>
  ),
  nature: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M3 19L9 8l4 7 3-5 5 9H3zM12 15l-1.5 4M9 8l1 2" />
    </svg>
  ),
  local: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M5 20v-8l5-4 5 4v8H5zM8 20v-4h4v4M15 9l3-2 3 2v5m-3 0v6" />
    </svg>
  ),
  sea: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M12 12V4m0 0l3 2m-3-2L9 6" />
    </svg>
  ),
  kculture: ({ className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...stroke}
      strokeWidth={1.4}
    >
      <path d="M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm11-2a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};
