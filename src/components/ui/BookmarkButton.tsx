"use client";

import { useSaved } from "@/lib/useSaved";
import { Bookmark } from "./icons";

type BookmarkButtonProps = {
  slug: string;
  // 사진 위에 얹는 작은 버튼의 모양
  variant?: "on-photo-dark" | "on-photo-light";
  label: string;
};

// 사진 위 저장 단추 (components.md §4-6).
// 저장된 상태는 책갈피 속이 채워지는 것으로만 알린다 — 글자는 늘지 않는다
export default function BookmarkButton({
  slug,
  variant = "on-photo-dark",
  label,
}: BookmarkButtonProps) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(slug);

  const skin =
    variant === "on-photo-light"
      ? "h-[34px] w-[34px] rounded-full bg-on-photo/85 text-ink hover:bg-on-photo"
      : "h-8 w-8 rounded-md bg-ink/30 text-on-photo hover:bg-ink/50";

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={saved}
      onClick={(e) => {
        // 카드 전체가 링크인 자리에서도 저장만 되게 한다
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={`absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center justify-center ${skin}`}
    >
      <Bookmark className="h-4 w-3.5" filled={saved} />
    </button>
  );
}
