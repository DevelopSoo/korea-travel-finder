"use client";

import { useActionState } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import TextField from "@/components/ui/TextField";
import { logIn, signUp, type AuthFormState } from "@/lib/authActions";
import type { Messages } from "@/messages";

type AuthFormProps = {
  mode: "login" | "signup";
  lang: string;
  // 성공하면 돌아갈 곳. 서버 액션이 한 번 더 검사한다
  next: string;
  switchHref: string;
  t: Messages["auth"];
};

const initialState: AuthFormState = { error: null, email: "" };

// 어느 칸 때문에 실패했는지. 이메일·비밀번호가 안 맞을 때는 어느 쪽인지 알려 주지 않는다
const emailErrors = new Set(["invalidEmail", "emailTaken"]);
const passwordErrors = new Set(["shortPassword", "weakPassword"]);

export default function AuthForm({
  mode,
  lang,
  next,
  switchHref,
  t,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(
    mode === "signup" ? signUp : logIn,
    initialState,
  );
  const copy = t[mode];
  const error = state.error;

  return (
    <>
      <h1 className="text-title">{copy.title}</h1>
      <p className="mt-3 font-display text-lead text-ink-soft">{t.lead}</p>

      <form action={formAction} className="mt-8 flex flex-col gap-5" noValidate>
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="next" value={next} />

        <TextField
          label={t.email}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.email}
          required
          invalid={error !== null && emailErrors.has(error)}
        />
        <TextField
          label={t.password}
          name="password"
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
          // authActions 의 MIN_PASSWORD, 대시보드 최소 길이와 같은 값
          minLength={mode === "signup" ? 8 : undefined}
          hint={mode === "signup" ? t.passwordHint : undefined}
          invalid={error !== null && passwordErrors.has(error)}
        />

        {/* 오류는 제출 뒤에만 생긴다. 화면 읽기 프로그램이 바로 읽도록 alert */}
        <p role="alert" className="text-small text-error empty:hidden">
          {error && t.errors[error]}
        </p>

        <div>
          <ButtonPrimary type="submit" disabled={pending}>
            {copy.submit}
          </ButtonPrimary>
        </div>
      </form>

      <p className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-6 text-small text-ink-soft">
        {copy.switchPrompt}
        <ArrowLink href={switchHref} accent>
          {copy.switchAction}
        </ArrowLink>
      </p>
    </>
  );
}
