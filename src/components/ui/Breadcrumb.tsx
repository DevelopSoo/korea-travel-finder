import Link from "next/link";

type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  items: Crumb[];
  // banded: 옅은 상자 띠 위에 (지역 안내) / plain: 배경 없이
  variant?: "plain" | "banded";
};

// 길 표시 (components.md §4-7). 마지막 칸은 링크가 아니다
export default function Breadcrumb({
  items,
  variant = "plain",
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={variant === "banded" ? "bg-paper-3" : undefined}
    >
      <ol className="mx-auto flex max-w-content flex-wrap gap-2 py-3 text-caption text-ink-mute gutter">
        {items.map((item, i) => (
          <li key={item.label} className="flex gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
