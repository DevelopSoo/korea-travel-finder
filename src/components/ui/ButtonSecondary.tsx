import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type Common = { children: ReactNode; arrow?: boolean; full?: boolean };

type ButtonSecondaryProps = Common &
  (
    | { href: string; external?: boolean }
    | {
        href?: never;
        type?: "button";
        onClick?: () => void;
        // 눌린 상태(저장됨)에서는 바탕을 옅게 채운다
        active?: boolean;
      }
  );

// 보조 버튼 (components.md §4-3). 테두리만 있는 버튼.
// 마우스를 올리면 테두리만 진해진다 — 배경이 칠해지지 않는다
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-lg border px-[22px] py-3 text-small font-semibold text-ink";
const skin = "border-line-strong hover:border-ink";

export default function ButtonSecondary(props: ButtonSecondaryProps) {
  const { children, arrow, full } = props;
  const width = full ? "w-full" : "";

  if (props.href !== undefined) {
    const external = "external" in props && props.external;
    return (
      <Link
        href={props.href}
        className={`${base} ${skin} ${width}`}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
        {arrow && <ArrowRight />}
      </Link>
    );
  }

  const { type = "button", onClick, active } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${skin} ${width} cursor-pointer ${
        active ? "bg-accent-soft" : ""
      }`}
    >
      {children}
      {arrow && <ArrowRight />}
    </button>
  );
}
