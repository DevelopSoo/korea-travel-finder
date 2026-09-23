import { useId } from "react";

type TextFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  // 칸 밑 안내 한 줄 (예: 비밀번호 길이)
  hint?: string;
  // 이 칸 때문에 실패했을 때. 테두리만 오류색이 되고 문구는 폼 한곳에서 알린다
  invalid?: boolean;
};

// 입력 칸 (components.md §4-16). 라벨은 위에 굵게, 칸은 surface 배경 + line-strong 테두리.
// 누르면 테두리만 먹색으로 진해진다 — 그림자·빛나는 테두리를 쓰지 않는다
export default function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  required,
  minLength,
  hint,
  invalid,
}: TextFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-small font-semibold">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={`w-full rounded-[5px] border bg-surface px-3.5 py-2.5 text-body text-ink outline-none focus:border-ink ${
          invalid ? "border-error" : "border-line-strong"
        }`}
      />
      {hint && (
        <p id={hintId} className="text-meta text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  );
}
