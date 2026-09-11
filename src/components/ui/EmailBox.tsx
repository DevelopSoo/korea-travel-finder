"use client";

import { useActionState, useId, useRef } from "react";
import type { Messages } from "@/messages";
import ButtonPrimary from "./ButtonPrimary";

// idle 기본 · focus 입력 중 · error 형식 오류 · failed 발송 실패(§4-14) · sent 보낸 후
export type EmailBoxStatus = "idle" | "focus" | "error" | "failed" | "sent";

type EmailBoxProps = {
  messages: Messages;
  // 보내기 성공이면 true. 실제 전송은 다음 계획에서 붙인다
  onSend: (email: string) => Promise<boolean>;
  // 상태를 강제로 고정한다 (부품 확인용). 없으면 입력에 따라 바뀐다
  status?: EmailBoxStatus;
};

type SubmitResult = Exclude<EmailBoxStatus, "focus">;

// 이메일 입력 칸 (components.md §4-13). 박스 테두리 line, 흰 배경.
// error 색(#B4382A)은 이 부품에서만 쓴다
export default function EmailBox({ messages, onSend, status }: EmailBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // 한 화면에 여러 개 있어도 id 가 겹치지 않게
  const inputId = useId();
  const messageId = `${inputId}-message`;

  const [result, submit, pending] = useActionState(
    async (_prev: SubmitResult, formData: FormData): Promise<SubmitResult> => {
      // 형식 검사는 브라우저의 type="email" 판정을 그대로 쓴다 (말풍선은 noValidate 로 끔)
      if (!inputRef.current?.checkValidity()) return "error";
      const ok = await onSend(String(formData.get("email")));
      return ok ? "sent" : "failed";
    },
    "idle",
  );

  const shown = status ?? result;
  const { email } = messages;

  if (shown === "sent") {
    return (
      <div className="rounded-md border border-line p-md">
        <p role="status" className="text-body text-ink">
          {email.sent}
        </p>
      </div>
    );
  }

  const inputBorder =
    shown === "error"
      ? "border-error"
      : shown === "focus"
        ? "border-accent"
        : "border-line focus:border-accent";

  return (
    <form
      action={submit}
      noValidate
      className="flex flex-col gap-md rounded-md border border-line bg-paper p-md"
    >
      <div>
        <p className="font-display text-card font-semibold text-ink">
          {email.title}
        </p>
        <p className="text-small text-ink-soft">{email.body}</p>
      </div>

      <div className="flex flex-col gap-xs">
        <label htmlFor={inputId} className="sr-only">
          {email.label}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={email.placeholder}
          aria-invalid={shown === "error" || undefined}
          aria-describedby={
            shown === "error" || shown === "failed" ? messageId : undefined
          }
          className={`h-12 w-full rounded-md border bg-paper px-md text-body text-ink outline-none placeholder:text-ink-soft ${inputBorder}`}
        />
        {shown === "error" && (
          <p id={messageId} className="text-small text-error">
            {email.invalid}
          </p>
        )}
        {/* 발송 실패: 입력 칸은 그대로 두고 문구만 보인다 */}
        {shown === "failed" && (
          <p id={messageId} className="text-small text-error">
            {messages.empty.sendFailed.title} {messages.empty.sendFailed.body}
          </p>
        )}
      </div>

      <ButtonPrimary
        type="submit"
        loading={pending}
        loadingLabel={messages.common.sending}
      >
        {email.submit}
      </ButtonPrimary>
      <p className="text-caption text-ink-soft">{email.note}</p>
    </form>
  );
}
