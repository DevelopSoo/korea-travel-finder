import type { ReactNode } from "react";

type ChoiceButtonProps = {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
};

// 선택 버튼 (components.md §4-4). 선택 상태는 부모(질문 화면)가 갖는다.
// 고른 후: 테두리 accent 2px + 글자 accent. 배경은 흰색 그대로, 체크 아이콘 없음
// 높이를 56px 로 고정해 테두리가 두꺼워져도 흔들리지 않는다
export default function ChoiceButton({
  children,
  selected,
  onClick,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`h-14 w-full cursor-pointer rounded-md bg-paper px-md text-body ${
        selected ? "border-2 border-accent text-accent" : "border border-line text-ink"
      }`}
    >
      {children}
    </button>
  );
}
