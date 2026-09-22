import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  action?: ReactNode;
};

// 빈 상태 (components.md §4-12). 그림이나 이모지를 넣지 않는다 — 한 줄과 다음 걸음뿐
export default function EmptyState({ title, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-14 text-center">
      <p className="font-display text-lead text-ink-soft">{title}</p>
      {action}
    </div>
  );
}
