"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// 브라우저에서 보는 로그인 상태. 화면 표시용이다 — 권한 판단은 서버(Server Action, RLS)가 한다.
// 로그인·로그아웃은 Server Action 이 쿠키를 바꾸므로 브라우저 클라이언트의 이벤트가 오지 않는다.
// 그래서 주소가 바뀔 때(로그인 뒤 이동), 로그아웃 직후, 탭으로 돌아올 때 쿠키를 다시 읽는다.

export type AuthUser = { id: string; email: string };

// undefined: 아직 모름 (서버가 그린 첫 그림, 확인 중) / null: 로그인 안 함
type AuthSnapshot = AuthUser | null | undefined;

let snapshot: AuthSnapshot = undefined;
const listeners = new Set<() => void>();

// 같은 사람이면 같은 객체를 유지해야 구독하는 화면이 쓸데없이 다시 그려지지 않는다
const keyOf = (s: AuthSnapshot) => (s ? s.id : String(s));

function set(next: AuthSnapshot) {
  if (keyOf(next) === keyOf(snapshot)) return;
  snapshot = next;
  listeners.forEach((fn) => fn());
}

export async function refreshAuth() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = error ? null : data?.claims;
  set(claims ? { id: claims.sub, email: claims.email ?? "" } : null);
}

let watching = false;

function watch() {
  if (watching) return;
  watching = true;
  // 토큰 갱신·만료처럼 브라우저 클라이언트가 직접 알게 되는 변화
  createClient().auth.onAuthStateChange(() => {
    // 이 콜백 안에서 auth 메서드를 기다리면 잠금이 걸린다 — 다음 틱으로 미룬다
    setTimeout(refreshAuth, 0);
  });
  // 다른 탭에서 로그인·로그아웃한 뒤 이 탭으로 돌아왔을 때
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refreshAuth();
  });
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  watch();
  return () => {
    listeners.delete(fn);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = (): AuthSnapshot => undefined;

export function useAuth() {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pathname = usePathname();

  useEffect(() => {
    refreshAuth();
  }, [pathname]);

  return { user, loading: user === undefined };
}
