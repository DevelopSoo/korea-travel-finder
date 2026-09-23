"use client";

import { usePathname } from "next/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import { Train } from "@/components/ui/icons";
import { useAuth } from "@/lib/useAuth";

type SavedNoteProps = {
  lang: string;
  labels: { guest: string; login: string; account: string };
};

// 저장 위치 안내 한 줄. 로그인했으면 계정, 아니면 이 기기.
// 로그인 여부는 브라우저에서 읽는다 — 서버가 쿠키를 읽지 않아야 페이지가 미리 만들어진다.
// 확인하는 동안에는 글 없이 자리만 잡아 둔다 (틀린 안내가 잠깐 보이지 않게)
export default function SavedNote({ lang, labels }: SavedNoteProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const loginHref = `/${lang}/login?${new URLSearchParams({ next: pathname })}`;

  // 확인 전에도 한 줄 높이를 잡아 두어 글이 들어올 때 아래가 밀리지 않게 한다
  return (
    <div className="mt-5.5 flex min-h-[1lh] flex-col items-start gap-2 text-small text-ink-2">
      {!loading && (
        <>
          <p className="flex items-center gap-3">
            <Train />
            {user ? labels.account : labels.guest}
          </p>
          {!user && (
            <ArrowLink href={loginHref} accent>
              {labels.login}
            </ArrowLink>
          )}
        </>
      )}
    </div>
  );
}
