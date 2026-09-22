import type { ReactNode } from "react";

type CtaBandProps = {
  title: string;
  body?: string;
  action: ReactNode;
  // soft: 옅은 그린 / paper: 종이 2단계
  tone?: "soft" | "paper";
};

// 밴드 (components.md §4-11). 페이지 끝에서 다음 걸음을 하나만 권한다.
// 한 페이지에 하나만 쓴다
export default function CtaBand({
  title,
  body,
  action,
  tone = "soft",
}: CtaBandProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-5 rounded-xl px-8 py-9 md:px-11 ${
        tone === "soft" ? "bg-accent-soft" : "bg-paper-2"
      }`}
    >
      <div>
        <h2 className="text-section">{title}</h2>
        {body && <p className="mt-2 text-small text-ink-2">{body}</p>}
      </div>
      {action}
    </div>
  );
}
