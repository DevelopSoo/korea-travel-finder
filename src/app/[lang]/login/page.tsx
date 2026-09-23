import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { safeNext } from "@/lib/safeNext";
import { createClient } from "@/lib/supabase/server";
import { getMessages, hasLocale, type Locale, type Messages } from "@/messages";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

// 로그인·가입 — 한 페이지에서 ?mode=signup 으로 바꾼다.
// 계정은 선택이다. 다른 페이지는 로그인을 요구하지 않는다
export default async function LoginPage({
  params,
  searchParams,
}: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const messages = getMessages(lang);

  return (
    <>
      <Breadcrumb
        items={[
          { label: messages.site.name, href: `/${lang}` },
          { label: messages.nav.login },
        ]}
      />
      <div className="mx-auto max-w-[27rem] pt-6 pb-16 gutter">
        {/* 주소 뒤 값과 쿠키는 요청 때만 알 수 있다 */}
        <Suspense>
          <LoginContent
            lang={lang}
            messages={messages}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </>
  );
}

async function LoginContent({
  lang,
  messages,
  searchParams,
}: {
  lang: Locale;
  messages: Messages;
  searchParams: PageProps<"/[lang]/login">["searchParams"];
}) {
  const { mode: rawMode, next: rawNext } = await searchParams;
  const mode = rawMode === "signup" ? "signup" : "login";
  const next = safeNext(rawNext, lang);

  // 이미 로그인했으면 폼을 보여 줄 이유가 없다
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) redirect(next);

  const otherMode = mode === "signup" ? "login" : "signup";
  const query = new URLSearchParams({ next });
  if (otherMode === "signup") query.set("mode", "signup");

  return (
    <AuthForm
      key={mode}
      mode={mode}
      lang={lang}
      next={next}
      switchHref={`/${lang}/login?${query}`}
      t={messages.auth}
    />
  );
}
