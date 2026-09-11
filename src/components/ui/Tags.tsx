type TagsProps = {
  // "Good for:"
  label: string;
  tags: string[];
};

// 태그 (components.md §4-12). Mono ink-soft, 사이 8px, 배경·테두리 없음.
// 이번 버전에서는 눌리지 않는다 — 태그별 목록 페이지가 없다
export default function Tags({ label, tags }: TagsProps) {
  return (
    <p className="flex flex-wrap gap-sm font-mono text-caption text-ink-soft">
      <span>{label}</span>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </p>
  );
}
