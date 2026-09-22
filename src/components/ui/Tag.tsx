// 태그 알약 (components.md §4-8). 누를 수 없다 — 분류를 보여 주기만 한다
export default function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-accent-soft-2 px-3.5 py-[7px] text-caption font-medium text-ink">
      {children}
    </span>
  );
}
