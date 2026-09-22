import Link from "next/link";
import type { Locale, Messages } from "@/messages";

type FooterProps = { lang: Locale; messages: Messages };

// 발 (structure.md §1-3). 글자만. 위쪽 1px 구분선
export default function Footer({ lang, messages }: FooterProps) {
  const t = messages.footer;

  const links = [
    { label: messages.nav.places, href: `/${lang}/places` },
    { label: messages.nav.experiences, href: `/${lang}/experiences` },
    { label: t.privacy, href: `/${lang}/privacy` },
  ];

  return (
    <footer className="mt-11">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 border-t border-line py-9 gutter">
        <Link href={`/${lang}`} className="font-display text-[19px] font-semibold">
          {messages.site.name}
        </Link>
        <nav className="flex flex-wrap gap-7 text-meta">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink-mute">
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="text-meta text-ink-soft">{t.tagline}</span>
      </div>
    </footer>
  );
}
