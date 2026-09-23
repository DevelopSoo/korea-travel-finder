"use client";

import { useSyncExternalStore } from "react";

// 화면 아래 알림줄 하나 (components.md §4-17). 한 번에 하나만 보인다 — 새 알림이 앞 알림을 바꾼다.
// 문구는 여기에 두지 않는다. 종류(kind)만 정하고 글자는 알림줄 부품이 messages 에서 고른다.

export type NoticeKind =
  | "saveFailed" // 저장 실패 → 다시 시도
  | "removeFailed" // 저장 해제 실패 → 다시 시도
  | "syncFailed" // 계정 목록 불러오기·합치기 실패 → 다시 시도
  | "removed"; // 저장 페이지에서 해제함 → 실행 취소

export type Notice = {
  id: number;
  kind: NoticeKind;
  // 버튼을 눌렀을 때 할 일. 버튼 글자는 kind 로 정해진다 (다시 시도 / 실행 취소)
  action?: () => void;
};

let current: Notice | null = null;
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function showNotice(kind: NoticeKind, action?: () => void) {
  current = { id: nextId++, kind, action };
  emit();
}

// id 를 주면 그 알림일 때만 닫는다 (그새 새 알림이 떴으면 그대로 둔다)
export function dismissNotice(id?: number) {
  if (!current || (id !== undefined && current.id !== id)) return;
  current = null;
  emit();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useNotice() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
