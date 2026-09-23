"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { Bookmark } from "@/components/ui/icons";
import { logOut } from "@/lib/authActions";
import { refreshAuth, useAuth } from "@/lib/useAuth";
import { useSaved } from "@/lib/useSaved";
import type { Locale, Messages } from "@/messages";

type HeaderProps = { lang: Locale; messages: Messages };

// 머리 (structure.md §1-3). 글자 로고 + 칸 2개 + 저장 + 로그인.
// 지금 보고 있는 칸에만 밑줄이 그어진다 — 색으로 표시하지 않는다
export default function Header({ lang, messages }: HeaderProps) {
  const pathname = usePathname();
  const { slugs } = useSaved();
  const { user, loading } = useAuth();
  const [loggingOut, startLogout] = useTransition();
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

  // 로그인 뒤 지금 페이지로 돌아온다
  const loginPath = `/${lang}/login`;
  const onLogin = pathname === loginPath;
  const loginHref = onLogin
    ? loginPath
    : `${loginPath}?${new URLSearchParams({ next: pathname })}`;

  const handleLogout = () =>
    startLogout(async () => {
      await logOut();
      // 실패했으면 쿠키가 남아 있으므로 그대로 로그인 상태로 보인다
      await refreshAuth();
    });

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

        <div className="flex items-center gap-5 md:gap-9">
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

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="cursor-pointer py-1.5 text-small hover:text-ink-mute disabled:cursor-default disabled:text-ink-mute"
            >
              {t.logout}
            </button>
          ) : (
            // 확인 중에는 자리만 잡아 둔다 (invisible 은 화면 읽기·탭 이동에서도 빠진다).
            // 로그인한 사람에게 "Log in" 이 잠깐 보이지 않게
            <Link
              href={loginHref}
              aria-current={onLogin ? "page" : undefined}
              className={`py-1.5 text-small ${loading ? "invisible" : ""} ${
                onLogin
                  ? "border-b-2 border-ink pb-[3px] font-semibold"
                  : "hover:text-ink-mute"
              }`}
            >
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
