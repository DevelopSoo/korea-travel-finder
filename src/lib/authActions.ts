"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthError } from "@supabase/supabase-js";
import { safeNext } from "@/lib/safeNext";
import { createClient } from "@/lib/supabase/server";
import { defaultLocale, hasLocale, type Messages } from "@/messages";

export type AuthErrorKey = keyof Messages["auth"]["errors"];

// 실패하면 오류 종류와 입력했던 이메일을 돌려준다 (폼이 비워지지 않게). 비밀번호는 돌려주지 않는다
export type AuthFormState = { error: AuthErrorKey | null; email: string };

// Supabase 대시보드의 최소 길이와 같게 둔다
const MIN_PASSWORD = 8;

type Mode = "login" | "signup";

function readForm(formData: FormData) {
  const field = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };
  const lang = field("lang");
  return {
    lang: hasLocale(lang) ? lang : defaultLocale,
    email: field("email").trim(),
    password: field("password"),
    next: field("next"),
  };
}

// Supabase 오류 코드 → 화면 문구. 모르는 코드는 원인을 서버 기록에만 남기고 일반 문구로 보여 준다
function toErrorKey(error: AuthError, mode: Mode): AuthErrorKey {
  switch (error.code) {
    case "invalid_credentials":
      return "wrongCredentials";
    case "user_already_exists":
    case "email_exists":
      return "emailTaken";
    case "weak_password":
      return "weakPassword";
    case "email_address_invalid":
    case "validation_failed":
      return "invalidEmail";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "tooMany";
    default:
      console.error(`[auth] ${mode} failed`, error.code, error.message);
      return "generic";
  }
}

async function submit(
  mode: Mode,
  formData: FormData,
): Promise<AuthFormState> {
  const { lang, email, password, next } = readForm(formData);

  if (!email || !password) return { error: "missing", email };
  if (mode === "signup" && password.length < MIN_PASSWORD) {
    return { error: "shortPassword", email };
  }

  const supabase = createClient(await cookies());
  const { data, error } =
    mode === "signup"
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: toErrorKey(error, mode), email };

  // 이메일 인증이 켜져 있으면 가입해도 세션이 없다. 이 사이트는 인증을 끄고 쓴다 (계획 §1)
  if (!data.session) {
    console.error(`[auth] ${mode} returned no session — is "Confirm email" off?`);
    return { error: "generic", email };
  }

  redirect(safeNext(next, lang));
}

export async function logIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  return submit("login", formData);
}

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  return submit("signup", formData);
}

// 로그아웃은 지금 보던 페이지에 그대로 머문다. 머리가 결과를 받아 상태를 다시 읽는다.
// local: 이 브라우저만 로그아웃한다 (기본값 global 은 다른 기기까지 끊는다)
export async function logOut(): Promise<{ ok: boolean }> {
  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    console.error("[auth] logout failed", error.code, error.message);
    return { ok: false };
  }
  return { ok: true };
}
