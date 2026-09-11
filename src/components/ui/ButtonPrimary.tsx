import Link from "next/link";
import type { ReactNode } from "react";

type ButtonPrimaryProps = {
  children: ReactNode;
} & (
  | { href: string }
  | {
      href?: never;
      type?: "button" | "submit";
      onClick?: () => void;
      disabled?: boolean;
      // 로딩: 글자만 loadingLabel 로 바뀐다. 도는 표시 없음
      loading?: boolean;
      loadingLabel?: string;
    }
);

// 큰 버튼 (components.md §4-1). 한 화면에 하나만 쓴다.
// 높이 52px, ink 배경, paper 글자, 눌림 ink-press. 커지거나 튀지 않는다
const base =
  "flex h-13 w-full items-center justify-center rounded-md text-body font-medium";
const enabled = "cursor-pointer bg-ink text-paper active:bg-ink-press";
const inactive = "bg-line text-ink-soft";

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={`${base} ${enabled}`}>
        {props.children}
      </Link>
    );
  }

  const { children, type = "button", onClick, disabled, loading, loadingLabel } =
    props;

  return (
    <button
      type={type}
      onClick={onClick}
      // 로딩 중에도 모양은 그대로 두고 누르기만 막는다
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${disabled ? inactive : enabled}`}
    >
      {loading ? (loadingLabel ?? children) : children}
    </button>
  );
}
