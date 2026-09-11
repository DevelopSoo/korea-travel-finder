"use client";

import EmailBox from "@/components/ui/EmailBox";
import type { Messages } from "@/messages";

// 가짜 전송 — 실제 저장·발송은 다음 계획(PRD §9 3주차)에서 붙인다
async function fakeSend() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return true;
}

export default function ResultsEmail({ messages }: { messages: Messages }) {
  return <EmailBox messages={messages} onSend={fakeSend} />;
}
