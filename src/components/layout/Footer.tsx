import Link from "next/link";
import type { Locale, Messages } from "@/messages";

type FooterProps = {
  lang: Locale;
  messages: Messages;
};

// 발: 글자 링크 3개 한 줄, 위쪽 1px line 구분선 (tokens.md §2-4, patterns.md 22번)
// 인스타·틱톡 주소는 임시 # — 계정이 생기면 교체
export default function Footer({ lang, messages }: FooterProps) {
  const links = [
    { label: messages.footer.instagram, href: "#" },
    { label: messages.footer.tiktok, href: "#" },
    { label: messages.footer.privacy, href: `/${lang}/privacy` },
  ];

  return (
    <footer className="border-t border-line">
      <ul className="mx-auto flex w-full max-w-content gap-md px-md py-lg text-small text-ink-soft">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
