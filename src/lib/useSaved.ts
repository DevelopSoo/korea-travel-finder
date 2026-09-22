"use client";

import { useCallback, useSyncExternalStore } from "react";

// 저장 목록은 이 기기의 브라우저에만 남는다 (계정 없음).
// 화면 여러 곳(머리 숫자, 카드 책갈피, 저장 페이지)이 같은 값을 봐야 해서
// localStorage 를 하나의 저장소로 두고 useSyncExternalStore 로 구독한다.

const KEY = "ek.saved.v1";

let cache: string[] = [];
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (typeof window === "undefined") return [];
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // 사생활 보호 모드 등에서 막힐 수 있다 — 빈 목록으로 둔다
    return cache;
  }
  // 같은 문자열이면 같은 배열을 돌려줘야 무한 렌더가 안 난다
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed)
        ? parsed.filter((v): v is string => typeof v === "string")
        : [];
    } catch {
      cache = [];
    }
  }
  return cache;
}

function write(next: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 저장이 막혀도 화면은 이번 방문 동안 바뀐 대로 보여 준다
  }
  cacheRaw = JSON.stringify(next);
  cache = next;
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  // 다른 탭에서 바뀐 것도 따라간다
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cacheRaw = null;
      read();
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

const serverSnapshot: string[] = [];

export function useSaved() {
  const slugs = useSyncExternalStore(subscribe, read, () => serverSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((s) => s !== slug));
  }, []);

  return { slugs, toggle, remove, isSaved: (slug: string) => slugs.includes(slug) };
}
