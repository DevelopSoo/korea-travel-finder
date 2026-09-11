import TextLink, { type TextLinkTarget } from "./TextLink";

type ProgressProps = {
  current: number;
  total: number;
  back: TextLinkTarget;
  backLabel: string;
};

// 진행 표시 (components.md §4-5). 왼쪽 ←, 오른쪽 `1 / 3` Mono ink-soft
// 점(● ○ ○)·막대 바는 쓰지 않는다
export default function Progress({
  current,
  total,
  back,
  backLabel,
}: ProgressProps) {
  return (
    <div className="flex items-center justify-between">
      <TextLink {...back} aria-label={backLabel}>
        ←
      </TextLink>
      <span className="font-mono text-caption text-ink-soft">
        {current} / {total}
      </span>
    </div>
  );
}
