import type { ReactNode } from "react";

type InfoTableRow = {
  label: string;
  // 글자 또는 <Stars /> 같은 부품
  value: ReactNode;
};

type InfoTableProps = {
  rows: InfoTableRow[];
};

// 정보 표 (components.md §4-11). 이름 Mono ink-soft / 값 ink, 줄 사이 1px line.
// 표 바깥 테두리·아이콘 없음
export default function InfoTable({ rows }: InfoTableProps) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline gap-md py-sm">
          <dt className="w-24 shrink-0 font-mono text-caption text-ink-soft">
            {row.label}
          </dt>
          <dd className="text-body text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
