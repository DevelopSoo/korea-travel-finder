import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type Common = {
  children: ReactNode;
  // 끝에 화살표를 붙인다
  arrow?: boolean;
  // 알약 모양 (저장 페이지 밴드에서만)
  pill?: boolean;
  // paper: 사진 위에 놓을 때. 그린은 어두운 사진 위에서 묻힌다 (patterns.md 8번)
  tone?: "accent" | "paper";
};

type ButtonPrimaryProps = Common &
  (
    | { href: string; external?: boolean }
    | {
        href?: never;
        type?: "button" | "submit";
        onClick?: () => void;
        disabled?: boolean;
      }
  );

// 큰 버튼 (components.md §4-3). 한 구역에 하나만 쓴다.
// 강조 그린 배경 + 흰 글자. 커지거나 떠오르지 않는다 — 눌림에서 색만 진해진다
const base =
  "inline-flex items-center justify-center gap-2.5 px-[22px] py-3 text-small font-semibold";
const tones = {
  accent: "bg-accent text-on-photo hover:bg-accent-press active:bg-accent-press",
  paper: "bg-paper text-ink hover:bg-on-photo",
} as const;
const off = "bg-line-strong text-paper";

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  const { children, arrow, pill, tone = "accent" } = props;
  const shape = pill ? "rounded-full" : "rounded-lg";
  const skin = tones[tone];

  if (props.href !== undefined) {
    const external = "external" in props && props.external;
    return (
      <Link
        href={props.href}
        className={`${base} ${shape} ${skin}`}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
        {arrow && <ArrowRight />}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${shape} ${disabled ? off : `${skin} cursor-pointer`}`}
    >
      {children}
      {arrow && <ArrowRight />}
    </button>
  );
}
