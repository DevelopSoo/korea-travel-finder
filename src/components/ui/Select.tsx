"use client";

type SelectProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

// 드롭다운 (components.md §4-13). 라벨은 왼쪽에 굵게 붙여 쓴다
export default function Select({
  label,
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <label className="flex items-center gap-2.5 text-small">
      <span className="font-semibold">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-[5px] border border-line-strong bg-surface px-3 py-2 text-meta text-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
