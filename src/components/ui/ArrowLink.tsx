import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  // underline: 글자 밑에 1.5px 밑줄 / plain: 밑줄 없음
  variant?: "underline" | "plain";
  // 강조 그린으로 (저장 페이지 안 링크)
  accent?: boolean;
  external?: boolean;
};

// 화살표 링크 (components.md §4-4). 이 사이트에서 "더 보기"는 전부 이 모양이다.
// 버튼처럼 보이는 링크를 따로 만들지 않는다
export default function ArrowLink({
  href,
  children,
  variant = "underline",
  accent,
  external,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center gap-2 text-meta font-semibold ${
        accent ? "text-accent-press" : "text-ink"
      } ${variant === "underline" ? "border-b-[1.5px] border-current pb-px" : "hover:text-ink-mute"}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <ArrowRight className="h-2.5 w-3.5 shrink-0" />
    </Link>
  );
}
