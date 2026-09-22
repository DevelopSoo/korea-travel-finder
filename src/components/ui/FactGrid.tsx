import type { ReactNode } from "react";

export type Fact = { icon: ReactNode; title: string; desc: string };

type FactGridProps = {
  facts: Fact[];
  // boxed: 옅은 상자 안 (상세 사진 바로 밑) / plain: 배경 없이
  variant?: "boxed" | "plain";
  minWidth?: string;
};

// 정보 칸 (components.md §4-9). 표가 아니라 아이콘 + 두 줄짜리 칸을 나란히 놓는다.
// 칸 사이는 세로 선 하나로 나눈다 — 마지막 칸 뒤에는 선이 없다
export default function FactGrid({
  facts,
  variant = "boxed",
  minWidth = "210px",
}: FactGridProps) {
  return (
    <dl
      className={`grid gap-y-5 ${
        variant === "boxed" ? "rounded-b-md bg-paper-3 px-3 py-5" : ""
      }`}
      style={{
        gridTemplateColumns: `repeat(auto-fit,minmax(${minWidth},1fr))`,
      }}
    >
      {facts.map((fact, i) => (
        <div
          key={fact.title}
          className={`flex items-start gap-3.5 px-5 ${
            i < facts.length - 1 ? "md:border-r md:border-line" : ""
          }`}
        >
          <span className="mt-0.5 inline-flex shrink-0 text-ink">
            {fact.icon}
          </span>
          <div>
            <dt className="text-small font-semibold text-ink">{fact.title}</dt>
            <dd className="mt-0.5 text-meta text-ink-soft">{fact.desc}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
