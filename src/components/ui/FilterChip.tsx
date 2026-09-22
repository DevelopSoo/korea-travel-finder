"use client";

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  // lg: 첫 화면 취향 칩 / md: 목록 필터 / sm: 지역 안내 필터
  size?: "lg" | "md" | "sm";
  icon?: React.ReactNode;
};

// 알약 필터 (components.md §4-5). 고른 것은 먹색으로 꽉 찬다.
// 한 화면에 고를 수 있는 건 하나뿐 — 다시 누르면 풀린다
const sizeClass = {
  lg: "min-w-[170px] justify-center gap-3.5 px-[30px] py-4 text-small",
  md: "px-[26px] py-3 text-small",
  sm: "px-[18px] py-2.5 text-meta",
} as const;

export default function FilterChip({
  label,
  active,
  onClick,
  size = "md",
  icon,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex cursor-pointer items-center rounded-full border font-medium ${
        sizeClass[size]
      } ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-line-strong bg-transparent text-ink hover:border-ink"
      }`}
    >
      {icon && <span className="inline-flex h-6 w-6 items-center justify-center">{icon}</span>}
      {label}
    </button>
  );
}
