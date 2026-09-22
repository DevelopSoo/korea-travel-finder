import Link from "next/link";
import type { ReactNode } from "react";

type ChipLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
};

// 알약 링크 (components.md §4-5). 첫 화면 취향 칩 — 누르면 그 취향으로 거른 목록으로 간다.
// 고른 상태가 없다: 첫 화면에 머무르지 않고 바로 옮겨 간다
export default function ChipLink({ href, label, icon }: ChipLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-3.5 rounded-full border border-line-strong px-5 py-3.5 text-small text-ink hover:border-ink md:min-w-[170px] md:px-[30px] md:py-4"
    >
      {icon && (
        <span className="inline-flex h-6 w-6 items-center justify-center">
          {icon}
        </span>
      )}
      {label}
    </Link>
  );
}
