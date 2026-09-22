"use client";

import { useSaved } from "@/lib/useSaved";
import { Bookmark } from "./icons";

type SaveButtonProps = {
  slug: string;
  saveLabel: string;
  savedLabel: string;
  // solid: 상세 페이지 주 버튼 / outline: 지역 안내 보조 버튼
  variant?: "solid" | "outline";
};

// 저장 버튼 — 글자가 있는 큰 것 (components.md §4-6)
export default function SaveButton({
  slug,
  saveLabel,
  savedLabel,
  variant = "solid",
}: SaveButtonProps) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(slug);

  const base =
    "inline-flex cursor-pointer items-center gap-2.5 rounded-lg px-[22px] py-3 text-small font-semibold";
  const skin =
    variant === "solid"
      ? `text-on-photo ${saved ? "bg-accent-press" : "bg-accent hover:bg-accent-press"}`
      : `border border-line-strong text-ink hover:border-ink ${saved ? "bg-accent-soft" : ""}`;

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      className={`${base} ${skin}`}
    >
      <Bookmark className="h-4 w-3.5" filled={saved} />
      {saved ? savedLabel : saveLabel}
    </button>
  );
}
