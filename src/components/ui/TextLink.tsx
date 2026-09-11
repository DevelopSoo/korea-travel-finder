import Link from "next/link";
import type { ReactNode } from "react";

export type TextLinkTarget =
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never };

type TextLinkProps = TextLinkTarget & {
  children: ReactNode;
  // ← 처럼 글자만으로 뜻이 안 전해질 때 읽어 줄 이름
  "aria-label"?: string;
};

// 글자 링크 (components.md §4-3). accent, 밑줄 2px 아래·두께 1px
// 주소 이동이면 next/link, 화면 안 동작이면 링크 모양 버튼
const className =
  "text-accent underline decoration-1 underline-offset-2";

export default function TextLink({
  children,
  "aria-label": ariaLabel,
  ...target
}: TextLinkProps) {
  if (target.href !== undefined) {
    return (
      <Link href={target.href} aria-label={ariaLabel} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={target.onClick}
      aria-label={ariaLabel}
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
}
