"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { showNotice } from "@/lib/notice";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/useAuth";

// 저장 목록은 로그인 여부에 따라 두 곳 중 하나에 있다 (계획 3단계).
// - 로그인 안 함: 이 기기의 브라우저(localStorage). 예전과 같다.
// - 로그인 함: 계정(Supabase saved_experiences). 다른 기기에서도 보인다.
// 화면 여러 곳(머리 숫자, 카드 책갈피, 저장 페이지)이 같은 값을 봐야 해서
// 모듈 하나를 저장소로 두고 useSyncExternalStore 로 구독한다. 화면 부품은 어느 쪽인지 모른다.
// 화면은 slug 를, DB 는 경험 id 를 쓴다. 둘을 바꾸는 일은 이 파일 안에서만 한다.

const KEY = "ek.saved.v1";

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

// ─── 이 기기 (로그인 안 함) ─────────────────────────────

let device: string[] = [];
let deviceRaw: string | null = null;

function readDevice(): string[] {
  if (typeof window === "undefined") return [];
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    // 사생활 보호 모드 등에서 막힐 수 있다 — 빈 목록으로 둔다
    return device;
  }
  // 같은 문자열이면 같은 배열을 돌려줘야 무한 렌더가 안 난다
  if (raw !== deviceRaw) {
    deviceRaw = raw;
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      device = Array.isArray(parsed)
        ? parsed.filter((v): v is string => typeof v === "string")
        : [];
    } catch {
      device = [];
    }
  }
  return device;
}

function writeDevice(next: string[]) {
  try {
    if (next.length === 0) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // 저장이 막혀도 화면은 이번 방문 동안 바뀐 대로 보여 준다
  }
  deviceRaw = next.length === 0 ? null : JSON.stringify(next);
  device = next;
  emit();
}

// ─── 계정 (로그인 함) ───────────────────────────────────

// undefined: 로그인 상태를 아직 모름 / null: 로그인 안 함 / 문자열: 로그인한 사람 id
let owner: string | null | undefined = undefined;
// 계정 목록. 불러오는 동안에는 빈 목록이다 — 이 기기의 목록이나 앞 사람의 목록을 섞어 보이지 않는다
let account: string[] = [];
// 사람이 바뀌면 늘어난다. 늦게 도착한 앞 사람의 응답을 버리는 데 쓴다
let generation = 0;
// 아직 DB 에 반영되지 않은 저장/해제 (slug → 저장 여부). 목록을 새로 불러와도 이것을 덮어쓰지 않는다
const pending = new Map<string, boolean>();
// DB 쓰기와 목록 불러오기를 하나씩 차례로 한다 (빠르게 두 번 누를 때 순서가 뒤집히지 않게)
let queue: Promise<unknown> = Promise.resolve();

const enqueue = <T>(task: () => Promise<T>) => {
  const run = queue.then(task, task);
  queue = run.catch(() => {});
  return run;
};

const supabase = () => createClient();

// slug → 경험 id. 공개된 경험만 보인다 (RLS). 모르는 slug 가 나오면 한 번 다시 읽는다
let ids: Map<string, number> | null = null;

// retry: supabase-js 는 읽기 요청이 네트워크 오류로 실패하면 몇 초에 걸쳐 다시 보낸다.
// 저장 버튼을 누른 뒤에는 그동안 결과를 모르는 채로 있게 되므로, 저장 중의 조회는 바로 실패시킨다
async function loadIds(retry = true) {
  const { data, error } = await supabase()
    .from("experiences")
    .select("id, slug")
    .retry(retry);
  if (error) throw error;
  ids = new Map(data.map((row) => [row.slug, row.id]));
  return ids;
}

async function idsFor(slugs: string[], retry = true) {
  let map = ids ?? (await loadIds(retry));
  if (slugs.some((slug) => !map.has(slug))) map = await loadIds(retry);
  return slugs.flatMap((slug) => {
    const id = map.get(slug);
    return id === undefined ? [] : [id];
  });
}

function setAccount(next: string[]) {
  account = next;
  emit();
}

// 불러온 목록 위에 아직 반영 중인 저장/해제를 다시 얹는다
function withPending(list: string[]) {
  let next = list;
  for (const [slug, saved] of pending) {
    if (saved && !next.includes(slug)) next = [...next, slug];
    if (!saved) next = next.filter((s) => s !== slug);
  }
  return next;
}

async function fetchAccount(): Promise<string[]> {
  // 비공개로 바뀐 경험은 experiences 가 null 로 온다 — 행은 두고 화면에서만 뺀다 (계획 3단계)
  const { data, error } = await supabase()
    .from("saved_experiences")
    .select("created_at, experiences(slug)")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data.flatMap((row) => (row.experiences ? [row.experiences.slug] : []));
}

// 로그인한 순간(또는 로그인한 채로 페이지를 연 순간): 이 기기 목록을 계정에 합치고 계정 목록을 불러온다
function syncAccount() {
  const gen = generation;
  return enqueue(async () => {
    if (gen !== generation) return;
    try {
      const local = readDevice();
      if (local.length > 0) {
        const rows = (await idsFor(local)).map((experience_id) => ({ experience_id }));
        if (rows.length > 0) {
          // 이미 계정에 있는 것은 건너뛴다 (기본 키 충돌 무시)
          const { error } = await supabase()
            .from("saved_experiences")
            .upsert(rows, { ignoreDuplicates: true });
          if (error) throw error;
        }
        // 합쳤으면 이 기기 목록은 비운다 — 공용 기기에서 다음 사람과 섞이지 않게 (§7 결정).
        // 이제 공개되지 않은 경험(id 를 못 찾은 slug)도 함께 버린다
        if (gen === generation) writeDevice([]);
      }
      const list = await fetchAccount();
      if (gen === generation) setAccount(withPending(list));
    } catch (error) {
      if (gen !== generation) return;
      console.warn("[saved] sync failed", error);
      showNotice("syncFailed", () => void syncAccount());
    }
  });
}

// 저장/해제 한 번. 화면은 먼저 바꾸고, DB 가 실패하면 되돌리고 알린다 (인수인계 §9.3)
function writeAccount(slug: string, save: boolean) {
  const gen = generation;
  pending.set(slug, save);
  setAccount(withPending(account));

  return enqueue(async () => {
    if (gen !== generation) return;
    try {
      const [id] = await idsFor([slug], false);
      if (id === undefined) throw new Error(`unknown experience: ${slug}`);
      const table = supabase().from("saved_experiences");
      const { error } = save
        ? await table.upsert({ experience_id: id }, { ignoreDuplicates: true })
        : await table.delete().eq("experience_id", id);
      if (error) throw error;
      if (pending.get(slug) === save) pending.delete(slug);
    } catch (error) {
      if (gen !== generation) return;
      console.warn(`[saved] ${save ? "save" : "remove"} failed`, error);
      // 그사이 반대로 다시 누르지 않았을 때만 되돌린다
      if (pending.get(slug) === save) {
        pending.delete(slug);
        setAccount(
          save ? account.filter((s) => s !== slug) : [...account, slug],
        );
      }
      showNotice(save ? "saveFailed" : "removeFailed", () =>
        writeAccount(slug, save),
      );
    }
  });
}

// ─── 로그인 상태 따라가기 ───────────────────────────────

function setOwner(next: string | null | undefined) {
  if (next === owner) return;
  owner = next;
  generation++;
  pending.clear();
  // 계정 목록은 메모리에만 두고 로그아웃하면 버린다 — 같은 기기를 다른 사람이 쓸 수 있다
  account = [];
  emit();
  if (typeof next === "string") void syncAccount();
}

let watching = false;

function subscribe(fn: () => void) {
  listeners.add(fn);
  if (!watching) {
    watching = true;
    // 다른 탭에서 이 기기 목록이 바뀐 것
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) {
        deviceRaw = null;
        readDevice();
        emit();
      }
    });
    // 다른 기기·탭에서 계정 목록이 바뀌었을 수 있다 — 이 탭으로 돌아오면 다시 읽는다
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && typeof owner === "string") {
        const gen = generation;
        void enqueue(async () => {
          if (gen !== generation) return;
          try {
            const list = await fetchAccount();
            if (gen === generation) setAccount(withPending(list));
          } catch (error) {
            // 조용히 넘긴다. 지금 보이는 목록이 그대로 남는다
            console.warn("[saved] refresh failed", error);
          }
        });
      }
    });
  }
  return () => {
    listeners.delete(fn);
  };
}

function getSnapshot(): string[] {
  if (owner === undefined) return serverSnapshot;
  return owner === null ? readDevice() : account;
}

const serverSnapshot: string[] = [];

// 지금 저장되어 있는가 (렌더 밖에서)
function isSavedNow(slug: string) {
  return getSnapshot().includes(slug);
}

function setSaved(slug: string, save: boolean) {
  if (owner === undefined) return; // 로그인 상태를 확인하는 아주 짧은 동안은 누르지 않은 것으로 둔다
  if (isSavedNow(slug) === save) return;
  if (owner === null) {
    const current = readDevice();
    writeDevice(save ? [...current, slug] : current.filter((s) => s !== slug));
  } else {
    void writeAccount(slug, save);
  }
}

export function useSaved() {
  const { user } = useAuth();

  useEffect(() => {
    setOwner(user === undefined ? undefined : (user?.id ?? null));
  }, [user]);

  const slugs = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);

  const toggle = useCallback((slug: string) => {
    setSaved(slug, !isSavedNow(slug));
  }, []);

  const remove = useCallback((slug: string) => {
    setSaved(slug, false);
  }, []);

  return { slugs, toggle, remove, isSaved: (slug: string) => slugs.includes(slug) };
}

// 실행 취소용: 다시 저장한다 (이미 저장되어 있으면 아무것도 안 한다)
export function restoreSaved(slug: string) {
  setSaved(slug, true);
}
