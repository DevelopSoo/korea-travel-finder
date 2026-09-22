import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  // 제목 밑 한 줄. Serif 로 크게 — 본문이 아니다
  lead?: string;
  eyebrow?: ReactNode;
  // 제목 오른쪽에 놓는 링크
  action?: ReactNode;
  align?: "left" | "center";
  size?: "title" | "section";
  as?: "h1" | "h2";
};

// 구역 제목 묶음 (components.md §4-2)
export default function SectionHeading({
  title,
  lead,
  eyebrow,
  action,
  align = "left",
  size = "title",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const heading = (
    <Tag className={size === "title" ? "text-title" : "text-section"}>
      {title}
    </Tag>
  );

  return (
    <div className={align === "center" ? "text-center" : undefined}>
      {eyebrow && <div className="mb-4">{eyebrow}</div>}
      {action ? (
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          {heading}
          {action}
        </div>
      ) : (
        heading
      )}
      {lead && (
        <p className="mt-2.5 font-display text-lead text-ink-2">{lead}</p>
      )}
    </div>
  );
}
