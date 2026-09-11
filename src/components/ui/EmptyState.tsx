import ButtonPrimary from "./ButtonPrimary";

type EmptyStateProps = {
  title: string;
  // 두 번째 줄. 404 처럼 한 문장뿐이면 비워 둔다
  body?: string;
  action: { label: string; href: string };
};

// 빈 상태 / 오류 (components.md §4-14). 글 두 줄과 큰 버튼 하나. 그림·일러스트 없음
export default function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col gap-lg py-xl">
      <div>
        <p className="text-body text-ink">{title}</p>
        {body && <p className="text-body text-ink">{body}</p>}
      </div>
      <ButtonPrimary href={action.href}>{action.label}</ButtonPrimary>
    </div>
  );
}
