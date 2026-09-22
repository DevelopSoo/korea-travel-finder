import ButtonPrimary from "@/components/ui/ButtonPrimary";
import EmptyState from "@/components/ui/EmptyState";
import { defaultLocale, getMessages } from "@/messages";

// [8] 없는 페이지 — 없는 slug, /en 아래 없는 주소 모두 여기로 온다.
// not-found 는 params 를 받지 못해 기본 언어로 그린다 (지금은 en 하나)
export default function NotFound() {
  const t = getMessages(defaultLocale).empty.notFound;

  return (
    <div className="mx-auto max-w-content gutter">
      <EmptyState
        title={t.title}
        action={
          <ButtonPrimary href={`/${defaultLocale}/experiences`} arrow>
            {t.action}
          </ButtonPrimary>
        }
      />
    </div>
  );
}
