"use client";

import { useEffect, useState } from "react";
import { dismissNotice, useNotice, type NoticeKind } from "@/lib/notice";

type NoticeProps = {
  labels: Record<NoticeKind, string> & { retry: string; undo: string };
};

// 몇 초 뒤 저절로 닫힌다. 마우스를 올리거나 버튼에 초점이 있으면 기다린다
const SHOW_MS = 6000;

// 화면 아래 알림줄 (components.md §4-17). 레이아웃에 하나만 둔다.
// 저장 실패·저장 해제 같은 짧은 결과를 알리고, 버튼 하나(다시 시도 / 실행 취소)를 준다
export default function Notice({ labels }: NoticeProps) {
  const notice = useNotice();
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!notice || held) return;
    const timer = setTimeout(() => dismissNotice(notice.id), SHOW_MS);
    return () => clearTimeout(timer);
  }, [notice, held]);

  const actionLabel = notice?.kind === "removed" ? labels.undo : labels.retry;

  return (
    // 읽기 도구가 바뀐 문구를 읽도록 틀은 늘 두고 안쪽만 바꾼다
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-5"
    >
      {notice && (
        <div
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
          className="pointer-events-auto flex max-w-[440px] flex-wrap items-center gap-x-5 gap-y-1.5 rounded-lg bg-ink px-5 py-3.5 text-small text-paper"
        >
          <span>{labels[notice.kind]}</span>
          {notice.action && (
            <button
              type="button"
              onClick={() => {
                notice.action?.();
                dismissNotice(notice.id);
                setHeld(false);
              }}
              className="cursor-pointer font-semibold underline underline-offset-2 hover:text-on-photo-soft"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
