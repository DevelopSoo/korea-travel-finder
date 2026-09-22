import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  // wide: 구역 위 안내말(자간 더 넓게) / tight: 카드 위 분류
  spacing?: "wide" | "tight";
  tone?: "mute" | "accent" | "on-photo";
  className?: string;
};

// 눈썹 글자 (components.md §4-2). 제목 위에 놓는 작은 대문자 한 줄.
// 이 사이트에서 대문자로 쓰는 곳은 여기와 사진 메모뿐이다
const toneClass = {
  mute: "text-ink-mute",
  accent: "text-accent font-semibold",
  "on-photo": "text-on-photo/85",
} as const;

export default function Eyebrow({
  children,
  spacing = "tight",
  tone = "mute",
  className = "",
}: EyebrowProps) {
  return (
    <p
      className={`text-eyebrow uppercase ${
        spacing === "wide" ? "tracking-[0.2em] text-xs" : ""
      } ${toneClass[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
