"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark } from "@/components/ui/icons";
import { useSaved } from "@/lib/useSaved";
import type { Locale, Messages } from "@/messages";

type HeaderProps = { lang: Locale; messages: Messages };

// 머리 (structure.md §1-3). 글자 로고 + 칸 2개 + 저장.
// 지금 보고 있는 칸에만 밑줄이 그어진다 — 색으로 표시하지 않는다
export default function Header({ lang, messages }: HeaderProps) {
  const pathname = usePathname();
  const { slugs } = useSaved();
  const t = messages.nav;

  const links = [
    { label: t.places, href: `/${lang}/places`, match: `/${lang}/places` },
    {
      label: t.experiences,
      href: `/${lang}/experiences`,
      match: `/${lang}/experiences`,
    },
  ];

  const savedHref = `/${lang}/saved`;
  const onSaved = pathname === savedHref;

  return (
    <header className="bg-paper">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 py-4.5 gutter">
        <Link href={`/${lang}`} className="font-display text-2xl font-bold tracking-[-0.01em]">
          {messages.site.name}
        </Link>

        <nav className="flex gap-7 text-small md:gap-11">
          {links.map((link) => {
            const active = pathname.startsWith(link.match);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "border-b-2 border-ink pb-[3px] font-semibold"
                    : "hover:text-ink-mute"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={savedHref}
          aria-current={onSaved ? "page" : undefined}
          className={`flex items-center gap-2 py-1.5 text-small ${
            onSaved
              ? "border-b-2 border-accent pb-[3px] font-semibold text-accent-press"
              : "hover:text-ink-mute"
          }`}
        >
          <Bookmark filled={onSaved} />
          {t.saved}
          {slugs.length > 0 && ` (${slugs.length})`}
        </Link>
      </div>
    </header>
  );
}
