import type { Score } from "@/lib/types";

type StarsProps = {
  value: Score;
  // 무엇에 대한 점수인지 — 별만 있으면 뭔지 모른다 (`EN`, `Local`)
  label: string;
  // 화면 읽기용 이름 (예: "English ease 3 of 5")
  ariaLabel: string;
};

// ★ 점수 (components.md §4-10). 채운 별 accent, 빈 별 line, 12px, 뒤에 Mono 라벨
export default function Stars({ value, label, ariaLabel }: StarsProps) {
  return (
    <span className="inline-flex items-center gap-xs font-mono text-caption">
      <span role="img" aria-label={ariaLabel}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= value ? "text-accent" : "text-line"}>
            ★
          </span>
        ))}
      </span>
      <span>{label}</span>
    </span>
  );
}
