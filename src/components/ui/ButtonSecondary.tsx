import Link from "next/link";
import type { ReactNode } from "react";

type ButtonSecondaryProps = {
  children: ReactNode;
} & (
  | {
      href: string;
      // 외부로 나가는 링크: 새 탭 + 끝에 ↗
      external?: boolean;
    }
  | { href?: never; external?: never; onClick?: () => void }
);

// 보조 버튼 (components.md §4-2). 배경 없음, 테두리 1px line, 높이 44px
const className =
  "inline-flex h-11 items-center gap-xs rounded-md border border-line px-md text-body text-ink";

export default function ButtonSecondary(props: ButtonSecondaryProps) {
  if (props.href === undefined) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={`${className} cursor-pointer`}
      >
        {props.children}
      </button>
    );
  }

  if (props.external) {
    return (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {props.children}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={props.href} className={className}>
      {props.children}
    </Link>
  );
}
