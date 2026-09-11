import Link from "next/link";
import type { Locale, Messages } from "@/messages";

type HeaderProps = {
  lang: Locale;
  messages: Messages;
};

// 머리: 높이 56px, 흰 배경, 글자 로고 + EN. 아래 구분선 없음 (structure.md §1-3)
export default function Header({ lang, messages }: HeaderProps) {
  return (
    <header className="bg-paper">
      <div className="mx-auto flex h-14 w-full max-w-content items-center justify-between px-md">
        {/* 임시 글자 로고 — 사이트 이름 미결 (design §7-1) */}
        <Link
          href={`/${lang}`}
          className="font-display text-card font-semibold text-ink"
        >
          {messages.site.name}
        </Link>
        {/* 언어 표시 자리. 지금은 눌리지 않는다 (PRD §8-4) */}
        <span className="font-mono text-caption text-ink-soft">
          {messages.header.language}
        </span>
      </div>
    </header>
  );
}
